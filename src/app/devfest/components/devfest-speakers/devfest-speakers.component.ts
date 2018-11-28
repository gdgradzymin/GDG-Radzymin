import { Component, OnInit, Input } from "@angular/core";
import { GdgImage } from "~/app/models/gdg-image.model";
import { GdgDevFestSpeaker } from "~/app/models/gdg-devfest-speaker.model";

@Component({
  selector: "app-devfest-speakers",
  templateUrl: "./devfest-speakers.component.html",
  styleUrls: ["./devfest-speakers.component.scss"]
})
export class DevfestSpeakersComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  image: GdgImage;

  @Input()
  speakers: Array<GdgDevFestSpeaker>;

  constructor() {}

  ngOnInit() {}
}
