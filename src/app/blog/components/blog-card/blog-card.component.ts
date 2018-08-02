import { Component, OnInit, Input } from '@angular/core';
import { GdgBlog } from '../../../models/gdg-blog.model';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-regular';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input() blog: GdgBlog;

  faCalendarAlt = faCalendarAlt;

  constructor() {}

  ngOnInit() {}
}
