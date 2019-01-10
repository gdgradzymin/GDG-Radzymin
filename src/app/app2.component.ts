import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-app2",
  templateUrl: "./app2.component.html",
  styleUrls: ["./app2.component.css"]
})
export class App2Component implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang("pl");
    this.translate.use("pl");
  }

  ngOnInit() {}
}
