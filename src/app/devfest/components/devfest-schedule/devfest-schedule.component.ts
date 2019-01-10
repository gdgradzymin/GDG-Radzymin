import { Component, OnInit, Input } from "@angular/core";
import { GdgDevFestEventItem } from "../../../models/gdg-devfest-event-item.model";

@Component({
  selector: "app-devfest-schedule",
  templateUrl: "./devfest-schedule.component.html",
  styleUrls: ["./devfest-schedule.component.css"]
})
export class DevfestScheduleComponent implements OnInit {
  @Input()
  schedule: Array<GdgDevFestEventItem>;

  constructor() {}

  ngOnInit() {}
}
