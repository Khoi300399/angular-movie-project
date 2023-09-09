import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { getMoviesPagination } from '../../core/store/movie/movie.action';
import { MoviesModel } from '../../core/store/movie/movie.model';
import { moviesPaginationSelector } from '../../core/store/movie/movie.selector';
import {
  Observable,
  debounceTime,
  map,
  of,
  startWith,
  switchAll,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl } from '@angular/forms';
import { DestroyService } from '../../core/services/destroy.service';

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
  searchControl: FormControl = new FormControl('');

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
    this.onSearchInputChange();
    this.moviesAll$ = this.store.select(moviesPaginationSelector);
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
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  getPageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  setPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  onSearchInputChange() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$),
        startWith(''),
        switchMap((keywords) => of(keywords))
      )
      .subscribe((keywords) => {
        this.store.dispatch(getMoviesPagination({ keywords }));
      });
  }
  onClickedOutsideSearch() {
    this.searchControl.reset();
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
  constructor(
    private store: Store<AppState>,
    private destroy$: DestroyService
  ) {}
}
function satrtWith(
  arg0: string
): import('rxjs').OperatorFunction<any, import('rxjs').ObservableInput<any>> {
  throw new Error('Function not implemented.');
}
