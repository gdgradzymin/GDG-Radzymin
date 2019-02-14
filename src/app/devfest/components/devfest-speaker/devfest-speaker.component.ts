import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { GdgDevFestSpeaker } from "../../../models/gdg-devfest-speaker.model";

@Component({
  selector: "app-devfest-speaker",
  templateUrl: "./devfest-speaker.component.html",
  styleUrls: ["./devfest-speaker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevfestSpeakerComponent implements OnInit {
  @Input()
  speaker: GdgDevFestSpeaker;

  constructor() {}

  ngOnInit() {
  }
}
