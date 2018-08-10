import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { GdgBlogPost } from '../../../models/gdg-blog-post.model';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-regular';
import { Observable } from 'rxjs';
import { Lang } from '../../../services/settings.service';


@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

 // @HostBinding('@routeFadeState') routeAnimation = true;

  @Input() blogPost: GdgBlogPost;

  @Input() locale: string;

  faCalendarAlt = faCalendarAlt;

  constructor() {}

  ngOnInit() {}
}
