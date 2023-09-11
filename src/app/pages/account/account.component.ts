import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { layThongTinTaiKhoan } from '../../core/store/auth/auth.actions';
import { Observable, map, takeUntil } from 'rxjs';
import {
  authSeclector,
  thongTinTaiKhoanSelector,
  thongTinTaiKhoanStatusSelector,
} from '../../core/store/auth/auth.selector';
import { Auth, ThongTinTaiKhoanModel } from '../../core/store/auth/auth.model';
import { DestroyService } from '../../core/services/destroy.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  currentIndex: number = 0;
  loading$: Observable<boolean> = this.store.pipe(
    select(thongTinTaiKhoanStatusSelector),
    map((status) => status === 'loading')
  );
  auth$!: Observable<Auth | null | undefined>;
  ngOnInit(): void {
    this.scrollToTop();

    this.store.dispatch(layThongTinTaiKhoan());

    this.auth$ = this.store.select(authSeclector);
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  constructor(
    private store: Store<AppState>,
    private destroy$: DestroyService
  ) {}
}
