import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { HomeTemplateModule } from '../../shared/modules/home-template.module';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormModule } from '../../shared/modules/form.module';
import { UpdateAccountComponent } from '../../layouts/update-account/update-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from '../../layouts/change-password/change-password.component';
import { DialogModule } from '@angular/cdk/dialog';
import { HistoryTicketComponent } from '../../layouts/history-ticket/history-ticket.component';

@NgModule({
  declarations: [
    AccountComponent,
    UpdateAccountComponent,
    ChangePasswordComponent,
    HistoryTicketComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HomeTemplateModule,
    SharedModule,
    FormModule,
    DialogModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
