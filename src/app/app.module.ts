import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgIdleModule } from '@ng-idle/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    NgIdleModule.forRoot(),
    LoadingBarHttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
