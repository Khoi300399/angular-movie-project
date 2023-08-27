import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTemplateComponent } from '../../templates/home-template/home-template.component';
import { HomeComponent } from '../../pages/home/home.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { HeaderComponent } from '../../layouts/header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CarouselComponent } from '../../layouts/carousel/carousel.component';
import { DialogModule } from '@angular/cdk/dialog';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModalVideoComponent } from '../../components/modal-video/modal-video.component';
import { LoadingComponent } from '../../components/loading/loading.component';
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
@NgModule({
  declarations: [
    HomeTemplateComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    ModalVideoComponent,
    LoadingComponent,
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
    StringifyPipe,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    OverlayModule,
    CdkMenuModule,
    CdkMenu,
    CdkMenuItem,
    DialogModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
