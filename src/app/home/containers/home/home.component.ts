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

    this.contentful.getBlogPostsFull(100).subscribe(posts => {
      console.log('blog posts: ', posts);
    });

    this.contentful.getBlogPostLinksFull(100).subscribe(blogLinks => {
      console.log('blog links: ', blogLinks);
    });
  }
}
