import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoWhiteSpace } from '../../shared/validators/no-white-space.validator';
import { Store, select } from '@ngrx/store';
import { login } from '../../core/store/auth/auth.actions';
import { Credentials } from '../../core/store/auth/auth.model';
import { AppState } from '../../core/store/app.state';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { vmFromLatest } from '../../core/utils/operators.util';
import {
  authErrorSelector,
  authStatusSelector,
} from '../../core/store/auth/auth.selector';
import { ToastrService } from 'ngx-toastr';
type AuthVm = {
  isLoading: Observable<boolean>;
};
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  vm$!: Observable<AuthVm>;

  readonly taiKhoan: string = 'taiKhoan';
  readonly matKhau: string = 'matKhau';

  // signInForm: FormGroup = new FormGroup({
  //   [this.taiKhoan]: new FormControl(''),
  //   [this.matKhau]: new FormControl(''),
  // });
  signInForm: FormGroup = this.formBuilder.group({
    [this.taiKhoan]: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        NoWhiteSpace,
      ]),
    ],
    [this.matKhau]: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,31}$/
        ),
      ]),
    ],
  });

  onLogin(formGroup: FormGroup) {
    let credentials: Credentials = formGroup.value;
    this.store.dispatch(login({ credentials }));
    this.vm$ = vmFromLatest<AuthVm>({
      isLoading:
        this.store.pipe(
          select(authStatusSelector),
          map((status) => status === 'loading')
        ) || of(false),
    });
    this.signInForm.reset();
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}
}
