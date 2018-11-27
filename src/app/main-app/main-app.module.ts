import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SharedModule } from 'src/app/shared/shared.module';

import { MainAppRoutingModule } from './main-app-routing.module';
import { MainAppComponent } from './main-app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NetworkComponent } from './pages/network/network.component';
import { ButtonGroupSelectorComponent } from './components/button-group-selector/button-group-selector.component';
import { CardAreaProjectionComponent } from './components/card-area-projection/card-area-projection.component';
import { CardBasicInfoComponent } from './components/card-basic-info/card-basic-info.component';
import { CardStackedBarHorizontalComponent } from './components/card-stacked-bar-horizontal/card-stacked-bar-horizontal.component';
import { CardIndividualHorizontalBarsComponent } from './components/card-individual-horizontal-bars/card-individual-horizontal-bars.component';
import { CardBarChartComponent } from './components/card-bar-chart/card-bar-chart.component';
import { CardMapComponent } from './components/card-map/card-map.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    SharedModule,
    MainAppRoutingModule
  ],
  declarations: [OverviewComponent, MainAppComponent, SidebarComponent, NetworkComponent, ButtonGroupSelectorComponent, CardAreaProjectionComponent, CardBasicInfoComponent, CardStackedBarHorizontalComponent, CardIndividualHorizontalBarsComponent, CardBarChartComponent, CardMapComponent, SettingsComponent]
})
export class MainAppModule { }
