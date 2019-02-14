import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { GdgDevFest } from "../../../models/gdg-devfest.model";

@Component({
  selector: "app-devfest-title",
  templateUrl: "./devfest-title.component.html",
  styleUrls: ["./devfest-title.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevfestTitleComponent implements OnInit {
  @Input()
  devFest: GdgDevFest;

  constructor() {}

  ngOnInit() {}
}
