import { Component, OnInit } from '@angular/core';
import {
  DanhSachGhe,
  DanhSachPhongVeModel,
  LoaiGhe,
} from '../../core/store/ticket/ticket.model';
import { Observable, takeUntil, tap } from 'rxjs';
import { AppState } from '../../core/store/app.state';
import { Store, select } from '@ngrx/store';
import { DestroyService } from '../../core/services/destroy.service';
import {
  danhSachPhongVeSelector,
  danhSachPhongVeStatusSelector,
} from '../../core/store/ticket/ticket.selector';
import { SeatBookingService } from '../../core/services/seat-booking.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalWarningComponent } from '../modal-warning/modal-warning.component';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
})
export class SeatsComponent implements OnInit {
  danhSachPhongVe$!: Observable<DanhSachPhongVeModel | null>;
  loaiGhe = LoaiGhe;
  ngOnInit(): void {
    this.danhSachPhongVe$ = this.store.pipe(
      select(danhSachPhongVeSelector),
      takeUntil(this.destroy$)
    );
  }

  toggleSeat(seat: DanhSachGhe) {
    if (this.isSeatSelected(seat)) {
      this.seatBookingService.deleteSeat(seat);
    } else {
      this.seatBookingService.selectSeat(seat);
      this.checkSelectSeatWithLimit(seat);
    }
    this.checkSeatGapBlocked(seat);
  }

  isSeatSelected(seat: DanhSachGhe): boolean {
    return this.seatBookingService.isSeatSelected(seat);
  }

  isSeatGapBlocked(): boolean {
    return this.seatBookingService.isSeatGapBlocked();
  }
  isSelectSeatWithLimit(): boolean {
    return this.seatBookingService.isSelectSeatWithLimit(10);
  }

  checkSeatGapBlocked(seat: DanhSachGhe) {
    if (this.isSeatGapBlocked()) {
      const dialogRef = this.dialog.open<string>(ModalWarningComponent, {
        data: {
          button: 'OK',
          notification: 'Không thể để trống ghế ở giữa!',
        },
        disableClose: true,
      });
      dialogRef.closed.subscribe(() => {
        this.seatBookingService.deleteSeat(seat);
      });
    }
  }
  checkSelectSeatWithLimit(seat: DanhSachGhe) {
    if (this.isSelectSeatWithLimit()) {
      const dialogRef = this.dialog.open<string>(ModalWarningComponent, {
        data: {
          button: 'OK',
          notification: 'Không thể đặt quá 10 chỗ!',
        },
        disableClose: true,
      });
      dialogRef.closed.subscribe(() => {
        this.seatBookingService.deleteSeat(seat);
      });
    }
  }

  clearSelection() {
    this.seatBookingService.clearSelectedSeats();
  }

  constructor(
    private store: Store<AppState>,
    private destroy$: DestroyService,
    private seatBookingService: SeatBookingService,
    public dialog: Dialog
  ) {}
}
