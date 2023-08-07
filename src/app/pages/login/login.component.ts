import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoWhiteSpace } from '../../shared/validators/no-white-space.validator';
import { Store, select } from '@ngrx/store';
import { login } from '../../core/store/auth/auth.actions';
import { Credentials } from '../../core/store/auth/auth.model';
import { AppState } from '../../core/store/app.state';
import { Observable, map } from 'rxjs';
import { vmFromLatest } from '../../core/utils/operators.util';
import { authStatusSelector } from '../../core/store/auth/auth.selector';
type AuthVm = {
  isloading: Observable<boolean>;
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

  onLogin(form: FormGroup) {
    let credentials: Credentials = form.value;
    this.store.dispatch(login({ credentials }));
    this.vm$ = vmFromLatest<AuthVm>({
      isloading: this.store.pipe(
        select(authStatusSelector),
        map((status) => status === 'loading')
      ),
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}
}
