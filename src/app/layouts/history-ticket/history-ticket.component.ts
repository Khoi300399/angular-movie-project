import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AppState } from '../../core/store/app.state';
import { Store } from '@ngrx/store';
import { ThongTinTaiKhoanModel } from '../../core/store/auth/auth.model';
import { Observable } from 'rxjs';
import { thongTinTaiKhoanSelector } from '../../core/store/auth/auth.selector';

@Component({
  selector: 'history-ticket',
  templateUrl: './history-ticket.component.html',
  styleUrls: ['./history-ticket.component.scss'],
})
export class HistoryTicketComponent implements OnInit {
  thongTinTaiKhoan$!: Observable<ThongTinTaiKhoanModel | null>;

  ngOnInit(): void {
    this.thongTinTaiKhoan$ = this.store.select(thongTinTaiKhoanSelector);
  }
  constructor(private store: Store<AppState>) {}
}
