import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';
import { HomeTemplateComponent } from './home-template.component';

const homeTemplateRoutes: Routes = [
  {
    path: '',
    component: HomeTemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'dat-ve',
        loadChildren: () =>
          import('../../pages/reserve/reserve.module').then(
            (m) => m.ReserveModule
          ),
      },
      {
        path: 'chi-tiet-phim',
        loadChildren: () =>
          import('../../pages/detail/detail.module').then(
            (m) => m.DetailModule
          ),
      },
      {
        path: 'tai-khoan',
        loadChildren: () =>
          import('../../pages/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeTemplateRoutes)],
  exports: [RouterModule],
})
export class HomeTemplateRoutingModule {}
