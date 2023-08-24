import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { getMovies } from '../../core/store/movie/movie.action';
import { MoviesModel } from '../../core/store/movie/movie.model';
import { moviesSelector } from '../../core/store/movie/movie.selector';
import { Observable, map } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  currentIndex: number = 0;
  moviesAll$!: Observable<MoviesModel[]>;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages!: number;
  ngOnInit(): void {
    let inderWidth = window.innerWidth;
    if (inderWidth >= 1400) {
      this.itemsPerPage = 12;
    } else if (inderWidth >= 1200) {
      this.itemsPerPage = 8;
    } else if (inderWidth >= 768) {
      this.itemsPerPage = 6;
    } else {
      this.itemsPerPage = 4;
    }
    this.store.dispatch(getMovies());
    this.moviesAll$ = this.store.select(moviesSelector);
  }
  get itemsOnCurrentPage(): Observable<MoviesModel[]> {
    return this.moviesAll$.pipe(
      map((items) => {
        this.totalPages = Math.ceil(items.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return items.slice(startIndex, endIndex);
      })
    );
  }
  get dangChieuTab(): Observable<MoviesModel[]> {
    return this.moviesAll$.pipe(
      map((items) => {
        return items.filter((item) => item.dangChieu);
      })
    );
  }
  get sapChieuTab(): Observable<MoviesModel[]> {
    return this.moviesAll$.pipe(
      map((items) => {
        return items.filter((item) => item.sapChieu);
      })
    );
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    this.moviesAll$.subscribe((items) => {
      const maxPage = Math.ceil(items.length / this.itemsPerPage);
      if (this.currentPage < maxPage) {
        this.currentPage++;
      }
    });
  }
  getPageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  setPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
  owlMovies: OwlOptions = {
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: false,
    navText: [
      '<span class="btn-prev"><i class="bx bx-chevron-left"></i></span>',
      '<span class="btn-next"><i class="bx bx-chevron-right"></i></span>',
    ],
    responsive: {
      0: {
        nav: false,
        items: 2,
        margin: 20,
      },
      576: {
        nav: false,
        items: 3,
        margin: 30,
      },
      768: {
        nav: true,
        items: 4,
        margin: 40,
      },
      992: {
        nav: true,
        items: 4,
        margin: 40,
      },
      1200: {
        nav: true,
        items: 5,
        margin: 40,
      },
    },
  };
  constructor(private store: Store<AppState>) {}
}
