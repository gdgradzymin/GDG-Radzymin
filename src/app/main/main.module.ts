import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TabsComponent } from './containers/tabs/tabs.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { GoBackComponent } from './components/go-back/go-back.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MainRoutingModule,
    TranslateModule,
  ],
  exports: [
    TabsComponent,
    GoBackComponent
  ],
  declarations: [TabsComponent, GoBackComponent]
})
export class MainModule { }
