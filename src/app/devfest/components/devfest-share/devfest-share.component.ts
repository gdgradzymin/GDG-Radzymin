import { Component, OnInit, Input } from "@angular/core";
import { GdgImage } from "~/app/models/gdg-image.model";

@Component({
  selector: "app-devfest-share",
  templateUrl: "./devfest-share.component.html",
  styleUrls: ["./devfest-share.component.scss"]
})
export class DevfestShareComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  image: GdgImage;

  constructor() {}

  ngOnInit() {
  }

}
