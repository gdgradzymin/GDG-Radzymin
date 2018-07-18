import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './containers/events/events.component';
import { MdToHtmlPipe } from '../pipes/md-to-html.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ],
  exports: [
    EventsComponent
  ],
  declarations: [EventsComponent, MdToHtmlPipe]
})
export class EventsModule { }
