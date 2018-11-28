import { Component, OnInit, Input } from "@angular/core";
import { GdgDevFestSpeakerEvent } from "~/app/models/gdg-devfest-speaker-event.model";

@Component({
  selector: "app-devfest-speaker",
  templateUrl: "./devfest-speaker.component.html",
  styleUrls: ["./devfest-speaker.component.css"]
})
export class DevfestSpeakerComponent implements OnInit {

  @Input()
  speakerEvent: GdgDevFestSpeakerEvent;

  constructor() { }

  ngOnInit() {
    console.log("SpeakerEvent: ", this.speakerEvent);
  }

}
