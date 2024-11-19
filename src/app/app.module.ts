import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { FormularioComponent } from './auth/pages/formulario/formulario.component';
import { MapComponent } from './auth/pages/map/map.component';
import { MapapageComponent } from './administrador/pages/mapapage/mapapage.component';
import { YahooWeatherComponent } from './auth/pages/yahoo-weather/yahoo-weather.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapapageComponent,
    YahooWeatherComponent,

    //FormularioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
