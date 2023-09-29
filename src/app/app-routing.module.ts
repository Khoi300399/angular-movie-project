import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomeTemplateComponent } from './templates/home-template/home-template.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/templates/home-template/home-template.module').then(
        (m) => m.HomeTemplateModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
