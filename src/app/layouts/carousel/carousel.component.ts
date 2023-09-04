import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppState } from '../../core/store/app.state';
import { getBanner } from '../../core/store/movie/movie.action';
import { Observable } from 'rxjs';
import { BannerModel } from '../../core/store/movie/movie.model';
import { bannerSelector } from '../../core/store/movie/movie.selector';
import { Dialog } from '@angular/cdk/dialog';
import { ModalVideoComponent } from '../../components/modal-video/modal-video.component';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  banners$!: Observable<BannerModel[]>;
  link: string = '';
  isDialogOpen: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(getBanner());
    this.banners$ = this.store.select(bannerSelector);
  }

  openDialog(trailer: string): void {
    this.dialog.open<string>(ModalVideoComponent, {
      data: { link: trailer },
    });
  }
  owlCarousel: OwlOptions = {
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 10000,
    dots: false,
    nav: true,
    navText: [
      '<span class="btn-prev"><i class="bx bx-chevron-left"></i></span>',
      '<span class="btn-next"><i class="bx bx-chevron-right"></i></span>',
    ],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      400: {},
      760: {},
      992: {
        stagePadding: 50,
      },
      1200: {
        stagePadding: 180,
      },
    },
  };
  constructor(private readonly store: Store<AppState>, public dialog: Dialog) {}
}
