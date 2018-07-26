import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private contentful: ContentfulService) { }

  ngOnInit() {
    this.contentful.logBlogPosts();
  }

}
