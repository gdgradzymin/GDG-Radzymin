import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './containers/events/events.component';
import { MdToHtmlPipe } from '../pipes/md-to-html.pipe';
import { SharedModule } from '../shared/shared.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    EventsComponent, EventCardComponent
  ],
  declarations: [EventsComponent, MdToHtmlPipe, EventCardComponent]
})
export class EventsModule { }
