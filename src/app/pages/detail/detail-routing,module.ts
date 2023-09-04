import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailComponent } from './detail.component';

const detailRoutes: Routes = [
  { path: '', children: [{ path: '', component: DetailComponent }] },
];

@NgModule({
  imports: [RouterModule.forChild(detailRoutes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
