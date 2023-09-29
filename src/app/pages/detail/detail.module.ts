import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing,module';
import { DialogModule } from '@angular/cdk/dialog';
import { HomeTemplateModule } from '../../templates/home-template/home-template.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    HomeTemplateModule,
    DialogModule,
  ],
})
export class DetailModule {}
