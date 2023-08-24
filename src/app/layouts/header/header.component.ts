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
import { Observable } from 'rxjs';
import { Auth } from '../../core/store/auth/auth.model';
import { authSeclector } from '../../core/store/auth/auth.selector';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ACCESS_TOKEN, AUTH } from '../../core/utils/interceptor.util';
import { logOut } from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isActiveMenu: boolean = false;
  isActiveSearch: boolean = false;
  isActiveHeader: boolean = false;
  isActiveSetting: boolean = false;
  isMobile!: boolean;
  auth$!: Observable<Auth | null | undefined>;
  @ViewChild('search') search!: ElementRef<HTMLElement>;
  @ViewChild('searchIcon') searchIcon!: ElementRef<HTMLElement>;
  @ViewChild('navbar') navbar!: ElementRef<HTMLElement>;
  @ViewChild('navbarIcon') navbarIcon!: ElementRef<HTMLElement>;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isActiveHeader = window.scrollY > 0;
  }
  @HostListener('window:click', ['$event'])
  onClickOutSide(event: Event) {
    let target = event.target as HTMLElement;

    if (
      target &&
      this.searchIcon &&
      this.searchIcon.nativeElement.contains(target)
    ) {
      this.isActiveSearch = true;
    } else if (
      target &&
      this.search &&
      !this.search.nativeElement.contains(target)
    ) {
      this.isActiveSearch = false;
    }

    if (
      target &&
      this.navbarIcon &&
      this.navbarIcon.nativeElement.classList.contains('active') &&
      this.navbarIcon.nativeElement.contains(target)
    ) {
      this.isActiveMenu = true;
    } else if (
      target &&
      this.navbarIcon &&
      !this.navbarIcon.nativeElement.classList.contains('active') &&
      this.navbarIcon.nativeElement.contains(target)
    ) {
      this.isActiveMenu = false;
    } else if (
      target &&
      this.navbar &&
      !this.navbar.nativeElement.contains(target)
    ) {
      this.isActiveMenu = false;
    }
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
  onClickedOutsideSearch() {
    this.isActiveSearch = false;
  }
  toggleActiveSearch() {
    this.isActiveSearch = !this.isActiveSearch;
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
    this.toastr.success('Đăng xuất thành công!');
  }
  constructor(
    public dialog: Dialog,
    private store: Store<AppState>,
    private toastr: ToastrService,
    private storageService: LocalStorageService
  ) {}
}
