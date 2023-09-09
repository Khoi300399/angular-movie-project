import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { TabGroupComponent } from '../../components/tab-group/tab-group.component';
import { TabPanelComponent } from '../../components/tab-panel/tab-panel.component';
import { TabPanelContentDirective } from '../../core/directives/tab-panel-content.directive';
import { ModalWarningComponent } from '../../components/modal-warning/modal-warning.component';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { VnCurrencyPipe } from '../../core/pipes/vn-currency.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    TabGroupComponent,
    TabPanelComponent,
    TabPanelContentDirective,
    ModalWarningComponent,
    ModalConfirmComponent,
    VnCurrencyPipe,
  ],
  exports: [
    LoadingComponent,
    TabGroupComponent,
    TabPanelComponent,
    TabPanelContentDirective,
    ModalWarningComponent,
    ModalConfirmComponent,
    VnCurrencyPipe,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
