import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { MaterialModule } from "./material/material.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { LayoutModule } from "@angular/cdk/layout";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MainModule } from "./main/main.module";
import { HomeComponent } from "./home/home.component";
import { EventsModule } from "./events/events.module";
import { TeamModule } from "./team/team.module";
import * as Hammer from "hammerjs";
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import { MAT_DATE_LOCALE } from "@angular/material";
import { registerLocaleData } from "@angular/common";
import localePl from "@angular/common/locales/pl";
import { SettingsService } from "./services/settings.service";
import { BlogModule } from "./blog/blog.module";
import { HomeContentCardComponent } from "./home/components/home-content-card/home-content-card.component";
import { MetatagsService } from "./services/metatags.service";
import { GdgDisclaimerComponent } from "./home/components/gdg-disclaimer/gdg-disclaimer.component";
import { App2Component } from "../app/app2.component";
import "mousetrap";
import { ModalGalleryModule } from "angular-modal-gallery";
import { DevFestModule } from "./devfest/devfest.module";
import { StateService } from "./services/state.service";

registerLocaleData(localePl);

export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: "pan-y"
    });

    return mc;
  }
}

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    AppComponent,
    App2Component,
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
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    LayoutModule,
    ModalGalleryModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      deps: [SettingsService],
      useFactory: settingsService => settingsService.getLocale()
    },
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: settingsService => settingsService.getLocale()
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    MetatagsService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
