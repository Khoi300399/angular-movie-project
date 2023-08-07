import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import * as AuthActions from './auth.actions';
import { ACCESS_TOKEN, AUTH } from '../../utils/interceptor.util';
import { AuthRes } from './auth.model';

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
          map((response: AuthRes) =>
            AuthActions.loginSuccess({ auth: response.content })
          ),
          catchError(({ error }) =>
            of(AuthActions.loginFailed({ error: error.statusCode }))
          )
        )
      )
    )
  );

  //   loginSuccess$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(authActions.loginSuccess),
  //         tap((action) => {
  //           this.localStorageService.setItem('user', action.user);
  //         })
  //       ),
  //     { dispatch: false }
  //   );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private storageService: LocalStorageService
  ) {}
}
