import { Component, ElementRef, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { DestroyService } from '../../core/services/destroy.service';
import { SeatBookingService } from '../../core/services/seat-booking.service';
import {
  DanhSachPhongVeModel,
  DatVeModel,
} from '../../core/store/ticket/ticket.model';
import { Observable, takeUntil } from 'rxjs';
import { danhSachPhongVeSelector } from '../../core/store/ticket/ticket.selector';
import { TicketService } from '../../core/services/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWarningComponent } from '../modal-warning/modal-warning.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ACCESS_TOKEN } from '../../core/utils/interceptor.util';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
interface Payment {
  id: string;
  image: string;
  label: string;
}
@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  danhSachPhongVe$!: Observable<DanhSachPhongVeModel | null>;
  selectedPayment!: string;
  payments: Payment[] = [
    {
      id: 'zalopay',
      image: '../../../assets/images/zalopay.webp',
      label: 'Thanh toán qua ZaloPay',
    },
    {
      id: 'momo',
      image: '../../../assets/images/momo.png',
      label: 'Thanh toán qua MoMo',
    },
    {
      id: 'visa',
      image: '../../../assets/images/visa.png',
      label: 'Visa, Master, JCB',
    },
    {
      id: 'atm',
      image: '../../../assets/images/atm.png',
      label: 'Thẻ ATM nội địa',
    },
  ];
  ngOnInit(): void {
    this.danhSachPhongVe$ = this.store.pipe(
      select(danhSachPhongVeSelector),
      takeUntil(this.destroy$)
    );
  }
  getSeatBooking() {
    return this.seatBookingService.getSelectedSeats();
  }
  getTicketPrice() {
    return this.seatBookingService.getTicketPrice();
  }
  getComboPrice() {
    return this.seatBookingService.getComboPrice();
  }
  getTotalPrice() {
    return this.seatBookingService.getTotalPrice();
  }
  onOpentCart(): void {
    return this.seatBookingService.onOpentCart();
  }
  isEmptyTicket(): boolean {
    return this.seatBookingService.isEmptyTicket();
  }
  isDisabled(): boolean {
    if (!this.isEmptyTicket()) {
      return false;
    }
    return true;
  }

  datVe(maLichChieu: number) {
    if (this.selectedPayment) {
      const datVeData: DatVeModel = {
        maLichChieu,
        danhSachVe: this.seatBookingService.getSelectedSeatsSubmit(),
      };

      const dialogRef = this.dialog.open<string>(ModalConfirmComponent, {
        data: {
          kind: 'info',
          title: 'Xác nhận đặt vé!',
          message: 'Bạn muốn tiếp tục đặt vé ?',
          titleConfirm: 'Xác nhận',
          titleCancel: 'Không',
        },
        disableClose: true,
      });
      dialogRef.closed.subscribe((result) => {
        if (result) {
          this.ticketService.postDatVe(datVeData).subscribe(
            () => {
              const dialogRef = this.dialog.open<string>(
                ModalConfirmComponent,
                {
                  data: {
                    kind: 'success',
                    title: 'Đặt vé thành công!',
                    message: 'Bạn muốn tiếp tục đặt vé này ?',
                    titleConfirm: 'Tiếp tục',
                    titleCancel: 'Về trang chủ',
                  },
                  disableClose: true,
                }
              );
              dialogRef.closed.subscribe((result) => {
                if (result) {
                  window.location.reload();
                } else {
                  this.router.navigate([''], { fragment: '' });
                  const body = this.elementRef.nativeElement.ownerDocument.body;
                  body.scrollTop = 0;
                }
              });
            },
            () => {
              const dialogRef = this.dialog.open<string>(
                ModalConfirmComponent,
                {
                  data: {
                    kind: 'error',
                    title: 'Đặt vé thất bại!',
                    message: 'Bạn muốn tiếp tục đặt lại vé này ?',
                    titleConfirm: 'Đặt lại',
                    titleCancel: 'Về trang chủ',
                  },
                  disableClose: true,
                }
              );
              dialogRef.closed.subscribe((result) => {
                if (result) {
                  window.location.reload();
                } else {
                  this.router.navigate(['/']);
                }
              });
            }
          );
        }
      });
    } else {
      this.dialog.open<string>(ModalWarningComponent, {
        data: {
          button: 'OK',
          notification: 'Vui lòng chọn phương thức thanh toán!',
        },
        disableClose: true,
      });
    }
  }
  onSubmit(maLichChieu: number) {
    if (this.storageService.get(ACCESS_TOKEN)) {
      if (!this.isDisabled()) {
        this.datVe(maLichChieu);
      }
    } else {
      const dialogRef = this.dialog.open<string>(ModalConfirmComponent, {
        data: {
          kind: 'error',
          title: 'Bạn chưa đăng nhập!',
          message: 'Bạn có muốn đăng nhập không ?',
          titleConfirm: 'Đăng nhập',
          titleCancel: 'Không',
        },
        disableClose: true,
      });
      dialogRef.closed.subscribe((result) => {
        if (result) {
          this.dialog.open<string>(ModalLoginComponent);
        }
      });
    }
  }

  constructor(
    private store: Store<AppState>,
    private destroy$: DestroyService,
    private seatBookingService: SeatBookingService,
    private ticketService: TicketService,
    private dialog: Dialog,
    private router: Router,
    private storageService: LocalStorageService,
    private elementRef: ElementRef
  ) {}
}
