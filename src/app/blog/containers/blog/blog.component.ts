import { Component, OnInit, OnDestroy } from "@angular/core";
import { ContentfulService } from "../../../services/contentful.service";
import { GdgBlogPost } from "../../../models/gdg-blog-post.model";
import { Observable, Subject, combineLatest } from "rxjs";
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
import { takeUntil, mergeMap } from "rxjs/operators";

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
    const currentLang$ = this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$));

    currentLang$
      .pipe(
        takeUntil(this.destroySubject$),
        mergeMap((lang) => {
          this.lang = lang;
          return combineLatest(
            this.translate
              .get("blogpagedesc")
              .pipe(takeUntil(this.destroySubject$)),
            this.translate
              .get("blogpagetitle")
              .pipe(takeUntil(this.destroySubject$)),
            this.translate
              .get("blogpagekeywords")
              .pipe(takeUntil(this.destroySubject$))
          );
        })
      )
      .subscribe((translations: Array<string>) => {
        this.meta.updateMetaDesc(translations[0]);
        this.meta.updateTitle(translations[1]);
        this.meta.updateMetaKeywords(translations[2]);
        this.loadBlogPosts();
      });


  }

  loadBlogPosts(): void {
    this.blogPosts$ = this.contentful.getBlogPosts(100, false);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
