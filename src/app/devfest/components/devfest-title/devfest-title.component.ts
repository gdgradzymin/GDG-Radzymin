import { Component, OnInit, Input } from "@angular/core";
import { GdgDevFest } from "~/app/models/gdg-devfest.model";

@Component({
  selector: "app-devfest-title",
  templateUrl: "./devfest-title.component.html",
  styleUrls: ["./devfest-title.component.scss"]
})
export class DevfestTitleComponent implements OnInit {

  @Input()
  devFest: GdgDevFest;
  
  constructor() { }

  ngOnInit() {
  }

}
