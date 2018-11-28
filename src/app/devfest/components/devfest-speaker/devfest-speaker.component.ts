import { Component, OnInit, Input } from "@angular/core";
import { GdgDevFestSpeaker } from "~/app/models/gdg-devfest-speaker.model";

@Component({
  selector: "app-devfest-speaker",
  templateUrl: "./devfest-speaker.component.html",
  styleUrls: ["./devfest-speaker.component.scss"]
})
export class DevfestSpeakerComponent implements OnInit {
  @Input()
  speaker: GdgDevFestSpeaker;

  constructor() {}

  ngOnInit() {
  }
}
