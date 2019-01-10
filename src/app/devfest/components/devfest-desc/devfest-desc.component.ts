import { Component, OnInit, Input } from "@angular/core";
import { GdgImage } from "../../../models/gdg-image.model";

@Component({
  selector: "app-devfest-desc",
  templateUrl: "./devfest-desc.component.html",
  styleUrls: ["./devfest-desc.component.scss"]
})
export class DevfestDescComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  image: GdgImage;

  @Input()
  meetupLink: string;

  constructor() {}

  ngOnInit() {
  }
}
