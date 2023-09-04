import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { Observable, map, takeUntil, tap } from 'rxjs';

import { layDanhSachPhongVe } from '../../core/store/ticket/ticket.action';
import { DestroyService } from '../../core/services/destroy.service';
import { ModalWarningComponent } from '../../components/modal-warning/modal-warning.component';
import { Dialog } from '@angular/cdk/dialog';
import { LoadingService } from '../../core/services/loading.service';
import { danhSachPhongVeStatusSelector } from '../../core/store/ticket/ticket.selector';

@Component({
  selector: 'reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss'],
})
export class ReserveComponent implements OnInit {
  isLoading$ = this.store.pipe(
    select(danhSachPhongVeStatusSelector),
    map((status) => status === 'loading')
  );

  ngOnInit(): void {
    this.scrollToTop();
    this.route.queryParams
      .pipe(
        tap((params) => {
          const maLichChieu = +params['maLichChieu'];
          this.store.dispatch(layDanhSachPhongVe({ maLichChieu }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onCountdownFinished() {
    const dialogRef = this.dialog.open<string>(ModalWarningComponent, {
      data: {
        button: 'Đặt lại',
        notification: 'Đã hết thời gian giữ ghế!',
      },
      disableClose: true,
    });
    dialogRef.closed.subscribe(() => {
      window.location.reload();
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  constructor(
    private store: Store<AppState>,
    private destroy$: DestroyService,
    private route: ActivatedRoute,
    public dialog: Dialog
  ) {}
}
