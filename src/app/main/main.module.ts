import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TabsComponent } from './containers/tabs/tabs.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
    TranslateModule,
  ],
  exports: [
    TabsComponent
  ],
  declarations: [TabsComponent]
})
export class MainModule { }
