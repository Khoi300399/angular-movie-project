import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dat-ve',
    loadChildren: () =>
      import('./pages/reserve/reserve.module').then((m) => m.ReserveModule),
  },
  {
    path: 'chi-tiet-phim',
    loadChildren: () =>
      import('./pages/detail/detail.module').then((m) => m.DetailModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
