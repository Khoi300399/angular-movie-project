import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesModel } from '../../core/store/movie/movie.model';
import { ModalVideoComponent } from '../modal-video/modal-video.component';
import { Store } from '@ngrx/store';
import { Dialog } from '@angular/cdk/dialog';
import { AppState } from '../../core/store/app.state';
import { getMovieById } from '../../core/store/movie/movie.action';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movie!: MoviesModel;
  openDialog(link: string): void {
    this.dialog.open<string>(ModalVideoComponent, {
      data: { link },
    });
  }
  constructor(public dialog: Dialog) {}
}
