import { Component, OnInit, OnDestroy } from "@angular/core";
import { ContentfulService } from "../../../services/contentful.service";
import { GdgBlogPost } from "../../../models/gdg-blog-post.model";
import { Observable, Subscription, Subject } from "rxjs";
import { SettingsService, Lang } from "../../../services/settings.service";
import {
  trigger,
  transition,
  style,
  query,
  stagger,
  animate
} from "@angular/animations";
import { TranslateService } from "@ngx-translate/core";
import { MetatagsService } from "../../../services/metatags.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),
        query(
          ":enter",
          stagger("300ms", [
            animate("800ms 300ms ease-out", style({ opacity: 1 }))
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts$: Observable<GdgBlogPost[]>;
  destroySubject$: Subject<void> = new Subject();
  lang: Lang;

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    // this.contentful.logBlogPosts();
    this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((lang: Lang) => {
        // it's time to change reload content
        this.lang = lang;
        this.translate
          .get("blogpagedesc")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((desc: string) => {
            this.meta.updateMetaDesc(desc);
          });

        this.translate
          .get("blogpagetitle")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((t: string) => {
            this.meta.updateTitle(t);
          });

        this.translate
          .get("blogpagekeywords")
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((k: string) => {
            this.meta.updateMetaKeywords(k);
          });
        this.loadBlogPosts();
      });
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.blogPosts$ = this.contentful.getBlogPosts(100, false);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
