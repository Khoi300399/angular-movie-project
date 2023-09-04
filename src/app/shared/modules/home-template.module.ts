import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTemplateComponent } from '../../templates/home-template/home-template.component';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeTemplateComponent, HeaderComponent, FooterComponent],
  exports: [HomeTemplateComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
})
export class HomeTemplateModule {}
