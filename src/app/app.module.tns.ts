import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { App2Component } from './app2.component';
import { HomeComponent } from './home/home.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { ContentfulService } from '~/app/services/contentful.service';

@NgModule({
  declarations: [
    App2Component,
    HomeComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule
  ],
  providers: [
  ],
  bootstrap: [App2Component],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
