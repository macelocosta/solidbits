import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainAppComponent } from './main-app.component';
import { OverviewComponent } from './pages/overview/overview.component';

const routes: Routes = [
  { path: '', component: MainAppComponent,
    children: [
      { path: '', redirectTo: 'overview' },
      { path: 'overview', component: OverviewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
