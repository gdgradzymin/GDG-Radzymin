import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';
import { GdgBlog } from '../../../models/gdg-blog.model';
import { Observable, Subscription } from 'rxjs';
import { SettingsService, Lang } from '../../../services/settings.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts$: Observable<GdgBlog[]>;
  blogSubscription: Subscription;

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService
  ) {
    this.blogSubscription = this.settings
      .getCurrentLang()
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.loadBlogPosts();
      });
  }

  ngOnInit() {
    // this.contentful.logBlogPosts();
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.blogPosts$ = this.contentful.getBlogPosts(100, false);
  }

  ngOnDestroy() {
    if (this.blogSubscription) {
      this.blogSubscription.unsubscribe();
    }
  }
}
