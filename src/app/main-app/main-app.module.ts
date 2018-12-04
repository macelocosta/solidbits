import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { CardDataService } from './services/card-data.service';
import { BusinessService } from './services/business.service';
import { OptionSelectorService } from './services/option-selector.service';
import { JwtInterceptor } from './../core/interceptors/jwt.interceptor';
import { SimpleNotificationsModule, NotificationAnimationType } from 'angular2-notifications';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalService } from './services/modal.service';

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
import { NodeCardComponent } from './pages/settings/components/node-card/node-card.component';
import { ModalComponent } from './components/modal/modal.component';
import { MapViewerComponent } from './components/map-viewer/map-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    SimpleNotificationsModule.forRoot({
      timeOut: 7000,
      showProgressBar: true,
      animate: NotificationAnimationType.FromBottom
    }),
    SharedModule,
    HttpClientModule,
    MainAppRoutingModule,
    NgProgressModule.forRoot({
      trickleSpeed: 200,
      min: 20,
      meteor: false,
      color: "#396AEF"
    }),
    NgProgressRouterModule.forRoot()
  ],
  declarations: [
    OverviewComponent,
    MainAppComponent,
    SidebarComponent,
    NetworkComponent,
    ButtonGroupSelectorComponent,
    CardAreaProjectionComponent,
    CardBasicInfoComponent,
    CardStackedBarHorizontalComponent,
    CardIndividualHorizontalBarsComponent,
    CardBarChartComponent,
    CardMapComponent,
    SettingsComponent,
    NodeCardComponent,
    ModalComponent,
    MapViewerComponent,
  ],
  providers: [
    CardDataService,
    OptionSelectorService,
    BusinessService,
    ModalService,
    { provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ]
})
export class MainAppModule { }
