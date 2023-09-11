import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NAME_PATTERN,
  PHONE_PATTERN,
} from '../../shared/validators/pattern.validator';
import { NoWhiteSpace } from '../../shared/validators/no-white-space.validator';
import { AuthService } from '../../core/services/auth.service';
import { ThongTinTaiKhoanModel } from '../../core/store/auth/auth.model';
import { Dialog } from '@angular/cdk/dialog';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { logOut } from '../../core/store/auth/auth.actions';
import { ModalLoginComponent } from '../../components/modal-login/modal-login.component';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ACCESS_TOKEN, AUTH } from '../../core/utils/interceptor.util';
import { Observable, filter, map, takeUntil, tap } from 'rxjs';
import {
  thongTinTaiKhoanSelector,
  thongTinTaiKhoanStatusSelector,
} from '../../core/store/auth/auth.selector';
import { DestroyService } from '../../core/services/destroy.service';

@Component({
  selector: 'update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss'],
})
export class UpdateAccountComponent implements OnInit {
  readonly taiKhoan = 'taiKhoan';
  readonly matKhau = 'matKhau';
  readonly email = 'email';
  readonly soDt = 'soDT';
  readonly hoTen = 'hoTen';
  thongTinTaiKhoan!: ThongTinTaiKhoanModel;
  loading$!: Observable<boolean>;
  loading: boolean = false;

  ngOnInit(): void {
    this.store
      .pipe(select(thongTinTaiKhoanSelector), takeUntil(this.destroy$))
      .subscribe((thongTinTaiKhoan) => {
        if (thongTinTaiKhoan) {
          this.thongTinTaiKhoan = thongTinTaiKhoan;
          this.updateForm.patchValue(thongTinTaiKhoan);
        }
      });
    this.loading$ = this.store.pipe(
      select(thongTinTaiKhoanStatusSelector),
      map((status) => status === 'loading')
    );
  }
  updateForm: FormGroup = this.formBuilder.group({
    [this.taiKhoan]: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
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

  onUpdateInfo(form: FormGroup) {
    const dialogRef = this.dialog.open<string>(ModalConfirmComponent, {
      data: {
        kind: 'info',
        title: 'Xác nhận cập nhật!',
        message: 'Bạn có chắc muốn cập nhật thông tin không?',
        titleConfirm: 'Xác nhận',
        titleCancel: 'không',
      },
      disableClose: true,
    });
    dialogRef.closed.subscribe((result) => {
      if (result) {
        let valueSubmit = { ...this.thongTinTaiKhoan, ...form.value };
        console.log('form.value', form.value);
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

  onSubmit(event: Event, form: FormGroup) {
    event.preventDefault();
    this.loading = true;
    this.onUpdateInfo(form);
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private dialog: Dialog,
    private storageService: LocalStorageService,
    private destroy$: DestroyService
  ) {}
}
