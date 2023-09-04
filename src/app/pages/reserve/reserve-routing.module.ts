import { RouterModule, Routes } from '@angular/router';
import { ReserveComponent } from './reserve.component';
import { NgModule } from '@angular/core';

const reserveRoutes: Routes = [
  { path: '', children: [{ path: '', component: ReserveComponent }] },
];

@NgModule({
  imports: [RouterModule.forChild(reserveRoutes)],
  exports: [RouterModule],
})
export class ReserveRoutingModule {}
