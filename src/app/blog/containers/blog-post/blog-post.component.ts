import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GdgBlogPost } from '../../../models/gdg-blog-post.model';
import { ContentfulService } from '../../../services/contentful.service';
import { Subscription, Observable } from 'rxjs';
import { SettingsService, Lang } from '../../../services/settings.service';
import { GdgBlogPostLink } from '../../../models/gdg-blog-post-link.model';
import { MetatagsService } from '../../../services/metatags.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  postLink: string;
  blogPost: GdgBlogPost;
  blogPost$: Observable<GdgBlogPost>;

  routeSub: Subscription;
  blogSub: Subscription;
  langSub: Subscription;
  blogPostLinkSub: Subscription;

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
    this.settings.setGoBackTo('blog');
    this.settings.setMenuBtnVisible(false);

    this.langSub = this.settings.getCurrentLang().subscribe((lang: Lang) => {
      // it's time to change reload content
      // console.log('blog post zmiana języka!');
      if (this.blogPost) {
        const url = '/blog/' + this.blogPost.getLink(lang.locale);
        this.router.navigateByUrl(url);
      }
    });

    this.routeSub = this.route.paramMap.subscribe(params => {
      this.postLink = params.get('postLink');
      if (this.postLink) {
        this.blogPostLinkSub = this.contentful
          .getBlogPostLink(this.postLink.toLowerCase())
          .subscribe((link: GdgBlogPostLink) => {
            this.loadBlogPost(link.blogPostId, link.locale);
            this.settings.setCurrentLangByLocale(link.locale);
          });
      }
    });
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
        console.log('An error during blog post loading!');
      }
    });
  }

  ngOnDestroy() {
    this.settings.resetNavigation();

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.blogSub) {
      this.blogSub.unsubscribe();
    }
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
    if (this.blogPostLinkSub) {
      this.blogPostLinkSub.unsubscribe();
    }
  }
}
