import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { GdgBlogPost } from "../../../models/gdg-blog-post.model";
import { ContentfulService } from "../../../services/contentful.service";
import { Subscription, Observable, Subject } from "rxjs";
import { SettingsService, Lang } from "../../../services/settings.service";
import { GdgBlogPostLink } from "../../../models/gdg-blog-post-link.model";
import { MetatagsService } from "../../../services/metatags.service";
import {
  Image,
  PlainGalleryConfig,
  PlainGalleryStrategy,
  GridLayout,
  Description,
  DescriptionStrategy
} from "angular-modal-gallery";
import { takeUntil, switchMap } from "rxjs/operators";

@Component({
  selector: "app-blog-post",
  templateUrl: "./blog-post.component.html",
  styleUrls: ["./blog-post.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostComponent implements OnInit, OnDestroy {
  postLink: string;
  blogPost: GdgBlogPost;
  blogPost$: Observable<GdgBlogPost>;

  destroySubject$: Subject<void> = new Subject();
  blogSub: Subscription;

  plainGalleryColumn: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout(
      { width: "98%", height: "auto" },
      { length: 1, wrap: true }
    )
  };

  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout(
      { width: "18%", height: "auto" },
      { length: 5, wrap: true }
    )
  };

  customDescription: Description = {
    strategy: DescriptionStrategy.ALWAYS_HIDDEN
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentful: ContentfulService,
    private settings: SettingsService,
    private meta: MetatagsService
  ) {}

  ngOnInit() {
    this.settings.setNavTabsVisible(false);
    this.settings.setGoBackBtnVisible(true);
    this.settings.setGoBackTo("blog");
    this.settings.setMenuBtnVisible(false);

    const currentLang$ = this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$));

    currentLang$.subscribe((lang: Lang) => {
      // it's time to change reload content
      if (this.blogPost) {
        const url = "/blog/" + this.blogPost.getLink(lang.locale);
        this.router.navigateByUrl(url);
      }
    });

    const routeParamMap$ = this.route.paramMap.pipe(
      takeUntil(this.destroySubject$)
    );

    routeParamMap$
      .pipe(
        switchMap((params: ParamMap) => {
          this.postLink = params.get("postLink");
          return this.contentful.getBlogPostLink(this.postLink.toLowerCase());
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe((link: GdgBlogPostLink) => {
        this.loadBlogPost(link.blogPostId, link.locale);
        this.settings.setCurrentLangByLocale(link.locale);
      });


  }

  private getImagesArray(): Array<Image> {
    if (this.blogPost.photos) {
      return this.blogPost.photos.map((imgstr: string, index: number) => {
        return new Image(index, { img: imgstr });
      });
    } else {
      return new Array<Image>();
    }
  }

  private loadBlogPost(id: string, locale: string) {
    this.blogPost$ = this.contentful.getBlogPost(id, locale);
    if (this.blogSub) {
      this.blogSub.unsubscribe();
    }
    this.blogSub = this.blogPost$.subscribe({
      next: (blogPost: GdgBlogPost) => {
        this.blogPost = blogPost;
        this.meta.updateTitle(this.blogPost.title);
        this.meta.updateMetaDesc(this.blogPost.contentShort);
        this.meta.updateMetaKeywords(this.blogPost.keywords);
      },
      error: (error: any) => {
        // in case of error
        console.log("An error during blog post loading!");
      }
    });
  }

  ngOnDestroy() {
    this.settings.resetNavigation();
    this.destroySubject$.next();

    if (this.blogSub) {
      this.blogSub.unsubscribe();
    }
  }
}
