import { Component, OnInit, Input } from "@angular/core";
import { GdgImage } from "~/app/models/gdg-image.model";

@Component({
  selector: "app-devfest-desc",
  templateUrl: "./devfest-desc.component.html",
  styleUrls: ["./devfest-desc.component.css"]
})
export class DevfestDescComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  image: GdgImage;

  constructor() {}

  ngOnInit() {
    console.log("title: " + this.title + " --content: " + this.content);
  }
}
