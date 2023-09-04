import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../pages/home/home.component';
import { CarouselComponent } from '../../layouts/carousel/carousel.component';
import { DialogModule } from '@angular/cdk/dialog';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModalVideoComponent } from '../../components/modal-video/modal-video.component';
import { BookingComponent } from '../../components/booking/booking.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';
import { OptionComponent } from '../../components/option/option.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from '../../layouts/movies/movies.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { TabGroupComponent } from '../../components/tab-group/tab-group.component';
import { TabPanelComponent } from '../../components/tab-panel/tab-panel.component';
import { TabPanelContentDirective } from '../../core/directives/tab-panel-content.directive';
import { StringifyPipe } from '../../core/pipes/stringify.pipe';
import { CinemasComponent } from '../../layouts/cinemas/cinemas.component';
import { AplicationComponent } from '../../layouts/aplication/aplication.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeTemplateModule } from './home-template.module';
import { AppRoutingModule } from '../../app-routing.module';
@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    ModalVideoComponent,
    BookingComponent,
    DropdownComponent,
    OptionComponent,
    MoviesComponent,
    ClickOutsideDirective,
    TabPanelContentDirective,
    MovieCardComponent,
    TabGroupComponent,
    TabPanelComponent,
    CinemasComponent,
    AplicationComponent,
    StringifyPipe,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    DialogModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    HomeTemplateModule,
    AppRoutingModule,
  ],
})
export class HomeModule {}
