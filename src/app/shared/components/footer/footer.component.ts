import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import {
  faFacebookSquare,
  faMeetup,
  faTwitter,
  faYoutube,
  faGithub
} from "@fortawesome/fontawesome-free-brands";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { GdgContactInfo } from "../../../models/gdg-contact-info.model";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  faFacebookSquare = faFacebookSquare;
  faMeetup = faMeetup;
  faEnvelope = faEnvelope;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faGithub = faGithub;

  @Input()
  contactInfo: GdgContactInfo;

  constructor() {}

  ngOnInit() {
    // console.log('contact info from footer: ', this.contactInfo);
  }
}
