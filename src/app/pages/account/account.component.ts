import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { layThongTinTaiKhoan } from '../../core/store/auth/auth.actions';
import { Observable, map } from 'rxjs';
import {
  thongTinTaiKhoanSelector,
  thongTinTaiKhoanStatusSelector,
} from '../../core/store/auth/auth.selector';
import { ThongTinTaiKhoanModel } from '../../core/store/auth/auth.model';

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
  thongTinTaiKhoan$!: Observable<ThongTinTaiKhoanModel | null>;
  ngOnInit(): void {
    this.scrollToTop();

    this.store.dispatch(layThongTinTaiKhoan());

    this.thongTinTaiKhoan$ = this.store.select(thongTinTaiKhoanSelector);
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  constructor(private store: Store<AppState>) {}
}
