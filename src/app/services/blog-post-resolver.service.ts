import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { GdgBlogPost } from "../models/gdg-blog-post.model";
import { ContentfulService } from "./contentful.service";
import { GdgBlogPostLink } from "../models/gdg-blog-post-link.model";
import { mergeMap, switchMap } from "rxjs/operators";

@Injectable()
export class BlogPostResolver implements Resolve<GdgBlogPost> {
  constructor(private contentful: ContentfulService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<GdgBlogPost> | Promise<GdgBlogPost> | GdgBlogPost {

    const blogPostLink$ = this.contentful.getBlogPostLink(
      route.url[1].toString()
    );

    return blogPostLink$
      .pipe(
        switchMap((blogPostLink: GdgBlogPostLink) => {
          return this.contentful.getBlogPost(
            blogPostLink.blogPostId,
            blogPostLink.locale
          );
        })
      );
  }
}
