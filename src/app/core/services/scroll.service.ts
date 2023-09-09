import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollMoviesSubject = new Subject<void>();

  scrollMovies$ = this.scrollMoviesSubject.asObservable();

  scrollToMovies() {
    this.scrollMoviesSubject.next();
  }
}
