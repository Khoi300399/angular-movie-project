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
import {
  CheckPasswordValidateDebounce,
  MatchedControls,
} from '../../shared/validators/matched.validator';
import { AuthService } from '../../core/services/auth.service';
import { ThongTinTaiKhoanModel } from '../../core/store/auth/auth.model';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { Dialog } from '@angular/cdk/dialog';
import { logOut } from '../../core/store/auth/auth.actions';
import {
  Observable,
  Subject,
  filter,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ACCESS_TOKEN, AUTH } from '../../core/utils/interceptor.util';
import { ModalLoginComponent } from '../../components/modal-login/modal-login.component';
import { thongTinTaiKhoanSelector } from '../../core/store/auth/auth.selector';
import { DestroyService } from '../../core/services/destroy.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  readonly matKhauCu = 'matKhauCu';
  readonly matKhau = 'matKhau';
  readonly xacThucMatKhau = 'xacThucMatKhau';
  thongTinTaiKhoan!: ThongTinTaiKhoanModel;
  formSubmit$: Subject<boolean> = new Subject<boolean>();
  loading: boolean = false;
  ngOnInit(): void {
    this.store
      .pipe(select(thongTinTaiKhoanSelector), takeUntil(this.destroy$))
      .subscribe((thongTinTaiKhoan) => {
        if (thongTinTaiKhoan) {
          this.thongTinTaiKhoan = thongTinTaiKhoan;
        }
      });
    this.formSubmit$
      .pipe(
        tap(() => this.updateForm.markAsDirty()),
        switchMap(() =>
          this.updateForm.statusChanges.pipe(
            startWith(this.updateForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => {
          this.onSubmit();
        })
      )
      .subscribe();
  }
  updateForm: FormGroup = this.formBuilder.group(
    {
      [this.matKhauCu]: ['', , CheckPasswordValidateDebounce(this.authService)],
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

  onUpdateInfo() {
    const dialogRef = this.dialog.open<string>(ModalConfirmComponent, {
      data: {
        kind: 'info',
        title: 'Xác nhận cập nhật!',
        message: 'Bạn có chắc muốn đổi mật khẩu không?',
        titleConfirm: 'Xác nhận',
        titleCancel: 'không',
      },
      disableClose: true,
    });
    dialogRef.closed.subscribe((result) => {
      if (result) {
        let valueSubmit = {
          ...this.thongTinTaiKhoan,
          ...this.updateForm.value,
        };
        this.authService.capNhatThongTinTaiKhoan(valueSubmit).subscribe(
          (response) => {
            const dialogRef = this.dialog.open<string>(ModalConfirmComponent, {
              data: {
                kind: 'success',
                title: 'Cập nhật thành công!',
                message: 'Vui lòng đăng nhập lại',
                titleConfirm: 'Đồng ý',
              },
              disableClose: true,
            });
            dialogRef.closed.subscribe((result) => {
              if (result) {
                this.updateForm.reset();
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
      } else {
        this.loading = false;
      }
    });
  }
  onSubmit() {
    this.loading = true;
    this.onUpdateInfo();
  }
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private dialog: Dialog,
    private storageService: LocalStorageService,
    private destroy$: DestroyService
  ) {}
}
