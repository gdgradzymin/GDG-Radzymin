import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { GdgBlogPost } from "../models/gdg-blog-post.model";
import { ContentfulService } from "./contentful.service";
import { GdgBlogPostLink } from "../models/gdg-blog-post-link.model";
import { switchMap, mergeMap } from "rxjs/operators";

export interface BlogPostData {
  blogPostLink$: Observable<GdgBlogPostLink>;
  blogPost$: Observable<GdgBlogPost>;
}

@Injectable()
export class BlogPostResolver implements Resolve<BlogPostData> {
  constructor(private contentful: ContentfulService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<BlogPostData> | Promise<BlogPostData> | BlogPostData {
    // TODO rxjs operator
    console.log("Route URL: " + route.url);
    const blogPostLink$ = this.contentful.getBlogPostLink(
      route.url[1].toString()
    );

    return blogPostLink$.pipe(
      mergeMap((blogPostLink: GdgBlogPostLink) => {
        return of({
          blogPost$: this.contentful.getBlogPost(
            blogPostLink.blogPostId,
            blogPostLink.locale
          ),
          blogPostLink$: blogPostLink$
        });
      })
    );
  }
}
