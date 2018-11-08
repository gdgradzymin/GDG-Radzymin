import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../material/material.module";
import { DevFestComponent } from "./containers/devfest/devfest.component";
import { DevfestDescComponent } from "./components/devfest-desc/devfest-desc.component";
import { DevfestShareComponent } from "./components/devfest-share/devfest-share.component";
import { TimerComponent } from "./components/timer/timer.component";
import { DevfestTitleComponent } from './components/devfest-title/devfest-title.component';


@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [],
  declarations: [DevFestComponent, DevfestDescComponent, DevfestShareComponent, TimerComponent, DevfestTitleComponent]
})
export class DevFestModule {}
