import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FundamentalNgxCoreModule, FdDatetimeModule, RtlService } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MetricSettingsComponent } from './home/metric-settings/metric-settings.component';
import { RouterModule } from '@angular/router';
import { MetricItemComponent } from './home/metric-item/metric-item.component';
import { DialogTemplateComponent } from './home/template/dialog-template/dialog-template.component';
// import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MetricSettingsComponent,
    MetricItemComponent,
    DialogTemplateComponent,
    // MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FundamentalNgxCoreModule,
    FdDatetimeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    FundamentalNgxPlatformModule,
    HttpClientModule
  ],
  // providers: [],
  exports: [
    // AppComponent,
    // HomeComponent,
    // MetricSettingsComponent,
    // MetricItemComponent,
    // DialogTemplateComponent,
    // MenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
