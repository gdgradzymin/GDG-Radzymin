import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventsRoutingModule } from "./events-routing.module";
import { EventsComponent } from "./containers/events/events.component";
import { SharedModule } from "../shared/shared.module";
import { EventCardComponent } from "./components/event-card/event-card.component";
import { MaterialModule } from "../material/material.module";
import { StoreModule } from "@ngrx/store";
import { reducers } from "../reducers/index";
import * as fromEvents from "../reducers/events.reducer";
import { EffectsModule } from "@ngrx/effects";
import { EventsEffects } from "../effects/events.effects";

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    StoreModule.forFeature("eventsModule", reducers),
    MaterialModule,
    StoreModule.forFeature("events", fromEvents.reducer),
    EffectsModule.forFeature([EventsEffects])
  ],
  exports: [
    EventsComponent, EventCardComponent
  ],
  declarations: [EventsComponent, EventCardComponent]
})
export class EventsModule { }
