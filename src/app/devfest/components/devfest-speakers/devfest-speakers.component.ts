import { Component, OnInit, Input } from "@angular/core";
import { GdgImage } from "~/app/models/gdg-image.model";

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

  constructor() {}

  ngOnInit() {}
}
