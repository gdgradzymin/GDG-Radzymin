import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentfulService } from '../../../services/contentful.service';
import { GdgBlogPost } from '../../../models/gdg-blog-post.model';
import { Observable, Subscription } from 'rxjs';
import { SettingsService, Lang } from '../../../services/settings.service';
import { trigger, transition, style, query, stagger, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('300ms', [
            animate(
              '800ms 300ms ease-out',
              style({opacity: 1})
            )
          ]), {optional: true}
        )
      ])
    ])
  ]
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts$: Observable<GdgBlogPost[]>;
  langSub: Subscription;
  lang: Lang;


  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
    private title: Title,
    private meta: Meta,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    // this.contentful.logBlogPosts();
    this.langSub = this.settings.getCurrentLang().subscribe((lang: Lang) => {
      // it's time to change reload content
      this.lang = lang;
      this.title.setTitle(
        this.translate.instant('blogpagetitle')
      );
      this.meta.updateTag({
        name: 'description',
        content: this.translate.instant('blogpagedesc')
      });
      this.loadBlogPosts();
    });
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.blogPosts$ = this.contentful.getBlogPosts(100, false);
  }




  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
