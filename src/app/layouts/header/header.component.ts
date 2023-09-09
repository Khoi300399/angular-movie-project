import { Dialog } from '@angular/cdk/dialog';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalLoginComponent } from '../../components/modal-login/modal-login.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Auth } from '../../core/store/auth/auth.model';
import { authSeclector } from '../../core/store/auth/auth.selector';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ACCESS_TOKEN, AUTH } from '../../core/utils/interceptor.util';
import { logOut } from '../../core/store/auth/auth.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { ScrollService } from '../../core/services/scroll.service';
import { FormControl } from '@angular/forms';
import { getMoviesPagination } from '../../core/store/movie/movie.action';
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
  @ViewChild('search') search!: ElementRef<HTMLElement>;
  @ViewChild('searchIcon') searchIcon!: ElementRef<HTMLElement>;
  @ViewChild('navbar') navbar!: ElementRef<HTMLElement>;
  @ViewChild('navbarIcon') navbarIcon!: ElementRef<HTMLElement>;
  @ViewChild('searchInput') searchInput!: ElementRef;

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
