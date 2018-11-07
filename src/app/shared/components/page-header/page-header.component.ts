import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.scss"]
})
export class PageHeaderComponent implements OnInit {
  @Input()
  headerHeight: number;

  @Input()
  urlState: string;

  isDevFest = false;

  cssClass: {};

  constructor() {}

  ngOnInit() {
    if (this.urlState === "devfest") {
      this.isDevFest = true;
      this.cssClass = {
        "page-header-devfest": true
      };
    } else {
      this.isDevFest = false;
      this.cssClass = {
        "page-header": true
      };
    }
  }
}
