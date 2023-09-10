import { Dialog } from '@angular/cdk/dialog';
import { Component, HostListener, OnInit } from '@angular/core';
import { ModalLoginComponent } from '../../components/modal-login/modal-login.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { Observable } from 'rxjs';
import { Auth } from '../../core/store/auth/auth.model';
import { authSeclector } from '../../core/store/auth/auth.selector';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ACCESS_TOKEN, AUTH } from '../../core/utils/interceptor.util';
import { logOut } from '../../core/store/auth/auth.actions';

import { DestroyService } from '../../core/services/destroy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isActiveMenu: boolean = false;
  isActiveHeader: boolean = false;
  isActiveSetting: boolean = false;
  isMobile!: boolean;
  auth$!: Observable<Auth | null | undefined>;
  isNavbarIconClicked = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isActiveHeader = window.scrollY > 0;
  }

  ngOnInit(): void {
    const innerWidth = window.innerWidth;
    if (innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.auth$ = this.store.select(authSeclector);
  }

  toggleActiveMenu() {
    this.isActiveMenu = !this.isActiveMenu;
  }
  onClickedOutsideMenu() {
    if (this.isActiveMenu && !this.isNavbarIconClicked) {
      this.isActiveMenu = false;
    }
    this.isNavbarIconClicked = false;
  }
  toggleActiveSetting() {
    this.isActiveSetting = !this.isActiveSetting;
  }
  onClickedOutsideSetting() {
    this.isActiveSetting = false;
  }

  openModalLogin(): void {
    this.dialog.open<string>(ModalLoginComponent);
  }
  onLogOut() {
    this.store.dispatch(logOut());
    this.storageService.remove(ACCESS_TOKEN);
    this.storageService.remove(AUTH);
  }

  constructor(
    public dialog: Dialog,
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    private destroy$: DestroyService
  ) {}
}
