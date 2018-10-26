import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { MainAppComponent } from './main-app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NodesComponent } from './pages/nodes/nodes.component';

@NgModule({
  imports: [
    CommonModule,
    MainAppRoutingModule
  ],
  declarations: [OverviewComponent, MainAppComponent, SidebarComponent, NodesComponent]
})
export class MainAppModule { }
