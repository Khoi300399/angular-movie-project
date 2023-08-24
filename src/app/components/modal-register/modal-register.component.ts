import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoWhiteSpace } from '../../shared/validators/no-white-space.validator';
import {
  NAME_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from '../../shared/validators/pattern.validator';
import { register } from '../../core/store/auth/auth.actions';
import { AppState } from '../../core/store/app.state';
import { Store, select } from '@ngrx/store';
import { DestroyService } from '../../core/services/destroy.service';
import { Observable, map, of, takeUntil } from 'rxjs';
import { registerStatusSelector } from '../../core/store/auth/auth.selector';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
  selector: 'modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss'],
})
export class ModalRegisterComponent implements OnInit {
  readonly taiKhoan = 'taiKhoan';
  readonly matKhau = 'matKhau';
  readonly email = 'email';
  readonly soDt = 'soDt';
  readonly hoTen = 'hoTen';
  loading$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.loading$ = this.store.pipe(
      select(registerStatusSelector),
      map((status) => {
        return status === 'loading' ? true : false;
      }),
      takeUntil(this.destroy$)
    );
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
  openModalLogin(): void {
    this.dialog.open<string>(ModalLoginComponent);
    this.dialogRef.close();
  }
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private destroy$: DestroyService,
    public dialogRef: DialogRef,
    public dialog: Dialog
  ) {}
}
