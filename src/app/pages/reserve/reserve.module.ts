import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveComponent } from './reserve.component';
import { HomeTemplateModule } from '../../shared/modules/home-template.module';
import { ReserveRoutingModule } from './reserve-routing.module';
import { SeatsComponent } from '../../components/seats/seats.component';
import { PurchaseComponent } from '../../components/purchase/purchase.component';
import { CountdownDirective } from '../../core/directives/countdown.directive';
import { ModalWarningComponent } from '../../components/modal-warning/modal-warning.component';
import { DialogModule } from '@angular/cdk/dialog';
import { VnCurrencyPipe } from '../../core/pipes/vn-currency.pipe';
import { CartComboComponent } from '../../components/cart-combo/cart-combo.component';
import { FormsModule } from '@angular/forms';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { LoadingComponent } from '../../components/loading/loading.component';

@NgModule({
  declarations: [
    ReserveComponent,
    SeatsComponent,
    PurchaseComponent,
    CountdownDirective,
    CartComboComponent,
    ModalWarningComponent,
    ModalConfirmComponent,
    LoadingComponent,
    VnCurrencyPipe,
  ],
  imports: [
    CommonModule,
    ReserveRoutingModule,
    HomeTemplateModule,
    DialogModule,
    FormsModule,
  ],
})
export class ReserveModule {}
