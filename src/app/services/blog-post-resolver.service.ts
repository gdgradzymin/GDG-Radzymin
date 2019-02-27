import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { GdgBlogPost } from "../models/gdg-blog-post.model";
import { ContentfulService } from "./contentful.service";
import { GdgBlogPostLink } from "../models/gdg-blog-post-link.model";
import { concatAll } from "rxjs/operators";

@Injectable()
export class BlogPostResolver implements Resolve<GdgBlogPost> {
  constructor(private contentful: ContentfulService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<GdgBlogPost> | Promise<GdgBlogPost> | GdgBlogPost {
      // TODO rxjs operator
    console.log("Route URL: " + route.url);
    const blogPostLink$ = this.contentful.getBlogPostLink(route.url[1].toString());

    this.contentful
      .getBlogPostLink(route.url[1].toString())
      .subscribe((value: GdgBlogPostLink) => {
        console.log("blog post link: ");
        console.dir(value);
        this.contentful.getBlogPost(value.blogPostId, value.locale).subscribe((blogPost: GdgBlogPost) => {
            console.log("blog post:");
            console.dir(blogPost);
        });
      });
    return of(
      new GdgBlogPost("test", "test", "0", "", "", "", null, null, null)
    );
  }
}
