import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private contentful: ContentfulService) {}

  ngOnInit() {
    this.contentful.getContactInfo().subscribe(data => {
      console.log('Data from contact info: ', data);
    });
  }
}
