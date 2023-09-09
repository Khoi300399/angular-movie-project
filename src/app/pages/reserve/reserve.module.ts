import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveComponent } from './reserve.component';
import { HomeTemplateModule } from '../../shared/modules/home-template.module';
import { ReserveRoutingModule } from './reserve-routing.module';
import { SeatsComponent } from '../../components/seats/seats.component';
import { PurchaseComponent } from '../../components/purchase/purchase.component';
import { CountdownDirective } from '../../core/directives/countdown.directive';
import { DialogModule } from '@angular/cdk/dialog';
import { CartComboComponent } from '../../components/cart-combo/cart-combo.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [
    ReserveComponent,
    SeatsComponent,
    PurchaseComponent,
    CountdownDirective,
    CartComboComponent,
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    HomeTemplateModule,
    DialogModule,
    FormsModule,
    SharedModule,
  ],
})
export class ReserveModule {}
