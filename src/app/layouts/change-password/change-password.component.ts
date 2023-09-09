import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AppState } from '../../core/store/app.state';
import { Store, select } from '@ngrx/store';
import { PASSWORD_PATTERN } from '../../shared/validators/pattern.validator';
import { NoWhiteSpace } from '../../shared/validators/no-white-space.validator';
import { MatchedControls } from '../../shared/validators/matched.validator';
import { AuthService } from '../../core/services/auth.service';
import { ThongTinTaiKhoanModel } from '../../core/store/auth/auth.model';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { logOut, login } from '../../core/store/auth/auth.actions';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ACCESS_TOKEN, AUTH } from '../../core/utils/interceptor.util';
import { ModalLoginComponent } from '../../components/modal-login/modal-login.component';
import { thongTinTaiKhoanSelector } from '../../core/store/auth/auth.selector';

const CheckPassword = (authService: AuthService) => {
  return function (
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return authService.layThongTinTaiKhoan().pipe(
      map((response) => {
        const matKhau = response.content.matKhau;
        const isMatching = matKhau === control.value;
        return isMatching ? null : { passwordMismatch: true };
      })
    );
  };
};

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  readonly matKhauCu = 'matKhauCu';
  readonly matKhau = 'matKhau';
  readonly xacThucMatKhau = 'xacThucMatKhau';
  thongTinTaiKhoan$!: Observable<ThongTinTaiKhoanModel | null>;

  loading: boolean = false;
  ngOnInit(): void {
    this.thongTinTaiKhoan$ = this.store.pipe(select(thongTinTaiKhoanSelector));
  }
  updateForm: FormGroup = this.formBuilder.group(
    {
      [this.matKhauCu]: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(PASSWORD_PATTERN),
          NoWhiteSpace,
        ]),
        CheckPassword(this.authService),
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
      [this.xacThucMatKhau]: [''],
    },
    {
      validators: MatchedControls('matKhau', 'xacThucMatKhau'),
    }
  );

  onUpdateInfo(thongTinTaiKhoan: ThongTinTaiKhoanModel) {
    if (thongTinTaiKhoan) {
      const dialogRef = this.dialog.open<string>(ModalConfirmComponent, {
        data: {
          kind: 'info',
          title: 'Xác nhận cập nhật!',
          message: 'Bạn có chắc muốn thay đổi mật khẩu không?',
          titleConfirm: 'Xác nhận',
          titleCancel: 'không',
        },
        disableClose: true,
      });
      dialogRef.closed.subscribe((result) => {
        if (result) {
          this.authService.capNhatThongTinTaiKhoan(thongTinTaiKhoan).subscribe(
            (response) => {
              const dialogRef = this.dialog.open<string>(
                ModalConfirmComponent,
                {
                  data: {
                    kind: 'success',
                    title: 'Thay đổi mật khẩu thành công!',
                    message: 'Vui lòng đăng nhập lại',
                    titleConfirm: 'Đăng nhập lại',
                  },
                  disableClose: true,
                }
              );
              dialogRef.closed.subscribe((result) => {
                if (result) {
                  this.store.dispatch(logOut());
                  this.storageService.remove(ACCESS_TOKEN);
                  this.storageService.remove(AUTH);
                  this.dialog.open<string>(ModalLoginComponent);
                }
              });
            },
            (error) => {
              // Xử lý lỗi khi cập nhật thông tin không thành công
              console.error('Lỗi khi cập nhật thông tin', error);
            },
            () => {
              this.loading = false;
            }
          );
        }
      });
    }
  }
  onSubmit(form: FormGroup) {
    this.loading = true;
    this.thongTinTaiKhoan$.subscribe((thongTinTaiKhoan) => {
      let valueSubmit = { ...thongTinTaiKhoan, ...form.value };
      this.onUpdateInfo(valueSubmit);
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private dialog: Dialog,
    private router: Router,
    private storageService: LocalStorageService
  ) {}
}
