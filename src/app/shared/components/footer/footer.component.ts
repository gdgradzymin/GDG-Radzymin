import { Component, OnInit } from '@angular/core';
import { faFacebookSquare, faMeetup } from '@fortawesome/fontawesome-free-brands';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faFacebookSquare = faFacebookSquare;
  faMeetup = faMeetup;
  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit() {
  }

}
