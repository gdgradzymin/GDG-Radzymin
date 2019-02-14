import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { GdgDevFestEventItem } from "../../../models/gdg-devfest-event-item.model";

@Component({
  selector: "app-devfest-schedule",
  templateUrl: "./devfest-schedule.component.html",
  styleUrls: ["./devfest-schedule.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevfestScheduleComponent implements OnInit {
  @Input()
  schedule: Array<GdgDevFestEventItem>;

  constructor() {}

  ngOnInit() {}
}
