import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './containers/events/events.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule
  ],
  exports: [
    EventsComponent
  ],
  declarations: [EventsComponent]
})
export class EventsModule { }
