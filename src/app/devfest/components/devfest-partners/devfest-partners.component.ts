import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { GdgImage } from "../../../models/gdg-image.model";

@Component({
  selector: "app-devfest-partners",
  templateUrl: "./devfest-partners.component.html",
  styleUrls: ["./devfest-partners.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevfestPartnersComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  content: string;

  @Input()
  image: GdgImage;

  constructor() {}

  ngOnInit() {}
}
