import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainAppComponent } from './main-app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { NetworkComponent } from './pages/network/network.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: '', component: MainAppComponent,
    children: [
      { path: '', redirectTo: 'overview' },
      { path: 'overview', component: OverviewComponent },
      { path: 'network', component: NetworkComponent },
      { path: 'settings', component: SettingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
