import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import * as AuthActions from './auth.actions';
import { ACCESS_TOKEN, AUTH } from '../../utils/interceptor.util';
import { AuthRes } from './auth.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          tap((response: AuthRes) => {
            this.storageService.setObject(AUTH, response.content);
            this.storageService.setObject(
              ACCESS_TOKEN,
              response.content.accessToken
            );
          }),
          map((response: AuthRes) => {
            this.toastr.success('Login Successfully!');
            return AuthActions.loginSuccess({ auth: response.content });
          }),
          catchError(({ error }) => {
            this.toastr.error(error.content, 'Login Failure!');
            return of(AuthActions.loginFailed({ error: error.message }));
          })
        )
      )
    )
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ user }) =>
        this.authService.register(user).pipe(
          map((response: AuthRes) => {
            this.toastr.success('Register Successfully!');
            return AuthActions.registerSuccess();
          }),
          catchError(({ error }) => {
            this.toastr.error(error.content, 'Register Failure!');
            return of(AuthActions.registerFailed({ error: error.message }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private storageService: LocalStorageService,
    private toastr: ToastrService
  ) {}
}
