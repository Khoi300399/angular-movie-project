import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../core/store/app.state';
import { Store, select } from '@ngrx/store';
import { DestroyService } from '../../core/services/destroy.service';
import { Credentials } from '../../core/store/auth/auth.model';
import { login } from '../../core/store/auth/auth.actions';
import { PASSWORD_PATTERN } from '../../shared/validators/pattern.validator';
import { NoWhiteSpace } from '../../shared/validators/no-white-space.validator';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { authStatusSelector } from '../../core/store/auth/auth.selector';
import { Observable, map, of, takeUntil } from 'rxjs';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent {
  readonly taiKhoan: string = 'taiKhoan';
  readonly matKhau: string = 'matKhau';
  loading$: Observable<boolean> = of(false);
  ngOnInit(): void {
    this.loading$ = this.store.pipe(
      select(authStatusSelector),
      map((status) => {
        return status === 'loading' ? true : false;
      }),
      takeUntil(this.destroy$)
    );
  }

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
        Validators.pattern(PASSWORD_PATTERN),
        NoWhiteSpace,
      ]),
    ],
  });

  onLogin(formGroup: FormGroup) {
    let credentials: Credentials = formGroup.value;
    this.store.dispatch(login({ credentials }));
    formGroup.reset();
    this.store.select(authStatusSelector).subscribe((status) => {
      if (status === 'loaded') {
        this.dialog.open<string>(ModalConfirmComponent, {
          data: {
            kind: 'success',
            title: 'Đăng nhập thành công!',
            titleConfirm: 'OK',
          },
        });
        this.dialogRef.close();
      }
    });
  }
  openModalRegister(): void {
    this.dialog.open<string>(ModalRegisterComponent);
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
