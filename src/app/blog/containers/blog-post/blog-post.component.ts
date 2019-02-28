import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { GdgBlogPost } from "../../../models/gdg-blog-post.model";
import { ContentfulService } from "../../../services/contentful.service";
import { Subscription, Observable, Subject, combineLatest } from "rxjs";
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
import { takeUntil, switchMap, skip, map } from "rxjs/operators";

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

    this.settings
      .getCurrentLang()
      .pipe(
        takeUntil(this.destroySubject$),
        skip(2)
      )
      .subscribe((lang: Lang) => {
        if (this.blogPost) {
          const url = "/blog/" + this.blogPost.getLink(lang.locale);
          this.router.navigateByUrl(url);
        }
      });

    const blogPostLink$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.postLink = params.get("postLink");
        return this.contentful.getBlogPostLink(this.postLink.toLowerCase());
      })
    );
    this.blogPost$ = this.route.data.pipe(map(v => v.blogPost));
    const latest$ = combineLatest(blogPostLink$, this.blogPost$);

    latest$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((v: [GdgBlogPostLink, GdgBlogPost]) => {
        this.postLink = v[0].link;
        this.blogPost = v[1];
        this.meta.updateTitle(this.blogPost.title);
        this.meta.updateMetaDesc(this.blogPost.contentShort);
        this.meta.updateMetaKeywords(this.blogPost.keywords);
        this.settings.setCurrentLangByLocale(v[0].locale);
      });
  }

  private getImagesArray(): Array<Image> {
    if (this.blogPost && this.blogPost.photos) {
      return this.blogPost.photos.map((imgstr: string, index: number) => {
        return new Image(index, { img: imgstr });
      });
    } else {
      return new Array<Image>();
    }
  }


  ngOnDestroy() {
    this.settings.resetNavigation();
    this.destroySubject$.next();
  }
}
