import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { registerLocaleData, CommonModule } from '@angular/common';
import * as Hammer from 'hammerjs';
import localePl from '@angular/common/locales/pl';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SettingsService } from './services/settings.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { HomeContentCardComponent } from './home/components/home-content-card/home-content-card.component';
import { GdgDisclaimerComponent } from './home/components/gdg-disclaimer/gdg-disclaimer.component';
import { CoreModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { EventsModule } from './events/events.module';
import { TeamModule } from './team/team.module';
import { MaterialModule } from './material/material.module';
import { BlogModule } from './blog/blog.module';
import { DevFestModule } from './devfest/devfest.module';
import { MetatagsService } from './services/metatags.service';
import { StateService } from './services/state.service';
import { MetatagsResolver } from './services/metatags-reslover.service';
import { BlogPostResolver } from './services/blog-post-resolver.service';
import { LayoutModule } from '@angular/cdk/layout';
import { ModalGalleryModule } from 'angular-modal-gallery';


registerLocaleData(localePl);

export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });

    return mc;
  }
}

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeContentCardComponent,
    GdgDisclaimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    CoreModule,
    SharedModule,
    MainModule,
    EventsModule,
    TeamModule,
    MaterialModule,
    BlogModule,
    DevFestModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LayoutModule,
    ModalGalleryModule.forRoot(),
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      deps: [SettingsService],
      useFactory: (settingsService: { getLocale: () => void; }) => settingsService.getLocale()
    },
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: { getLocale: () => void; }) => settingsService.getLocale()
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    MetatagsService,
    StateService,
    MetatagsResolver,
    BlogPostResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
