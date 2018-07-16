import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './containers/events/events.component';
import { MdToHtmlPipe } from '../pipes/md-to-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule
  ],
  exports: [
    EventsComponent
  ],
  declarations: [EventsComponent, MdToHtmlPipe]
})
export class EventsModule { }
