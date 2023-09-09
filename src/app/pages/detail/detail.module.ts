import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { HomeTemplateModule } from '../../shared/modules/home-template.module';
import { DetailRoutingModule } from './detail-routing,module';
import { DialogModule } from '@angular/cdk/dialog';

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
