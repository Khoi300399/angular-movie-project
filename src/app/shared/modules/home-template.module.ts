import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTemplateComponent } from '../../templates/home-template/home-template.component';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeTemplateComponent,
    HeaderComponent,
    FooterComponent,
    ClickOutsideDirective,
  ],
  exports: [
    HomeTemplateComponent,
    HeaderComponent,
    FooterComponent,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class HomeTemplateModule {}
