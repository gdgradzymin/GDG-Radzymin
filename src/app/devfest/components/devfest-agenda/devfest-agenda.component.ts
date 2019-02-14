import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { GdgImage } from "../../../models/gdg-image.model";
import { GdgDevFestEventItem } from "../../../models/gdg-devfest-event-item.model";

@Component({
  selector: "app-devfest-agenda",
  templateUrl: "./devfest-agenda.component.html",
  styleUrls: ["./devfest-agenda.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevfestAgendaComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  image: GdgImage;

  @Input()
  devFestEventItems: Array<GdgDevFestEventItem>;

  constructor() { }

  ngOnInit() {
  }

}
