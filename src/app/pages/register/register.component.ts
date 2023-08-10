import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../core/store/app.state';
import { Store, select } from '@ngrx/store';
import { NoWhiteSpace } from '../../shared/validators/no-white-space.validator';
import {
  NAME_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from '../../shared/validators/pattern.validator';
import { registerStatusSelector } from '../../core/store/auth/auth.selector';
import { Observable, map, of, takeUntil } from 'rxjs';
import { register } from '../../core/store/auth/auth.actions';
import { vmFromLatest } from '../../core/utils/operators.util';
import { DestroyService } from '../../core/services/destroy.service';
type AuthVm = {
  isLoading: Observable<boolean>;
};
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  readonly taiKhoan = 'taiKhoan';
  readonly matKhau = 'matKhau';
  readonly email = 'email';
  readonly soDt = 'soDt';
  readonly hoTen = 'hoTen';
  vm$!: Observable<AuthVm>;
  ngOnInit(): void {
    this.vm$ = vmFromLatest<AuthVm>({
      isLoading:
        this.store.pipe(
          select(registerStatusSelector),
          map((status) => status === 'loading')
        ) || of(false),
    }).pipe(takeUntil(this.destroy$));
  }
  registerForm: FormGroup = this.formBuilder.group({
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
        Validators.pattern(PASSWORD_PATTERN),
        NoWhiteSpace,
      ]),
    ],

    [this.hoTen]: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(NAME_PATTERN),
      ]),
    ],
    [this.email]: [
      '',
      Validators.compose([Validators.required, Validators.email]),
    ],
    [this.soDt]: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(PHONE_PATTERN),
      ]),
    ],
  });
  onRegister(registerForm: FormGroup) {
    const user = registerForm.value;
    this.store.dispatch(register({ user }));

    registerForm.reset();
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private destroy$: DestroyService
  ) {}
}
