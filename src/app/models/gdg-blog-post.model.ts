import { GdgTeamMember } from "./gdg-team-member.model";
import { GdgBlogPostLink } from "./gdg-blog-post-link.model";

export interface GdgBlogPostModel {
  id: string;
  title: string;
  postDate: string;
  postPhoto: string;
  postPhotoSmall: string;
  content: string;
  contentShort: string;
  author: GdgTeamMember;
  keywords: string;
  links?: GdgBlogPostLink[];
  photos?: string[];
}

export class GdgBlogPost implements GdgBlogPostModel {
  public photos: string[] = [];
  public links: GdgBlogPostLink[] = [];
  constructor(
    public id: string,
    public title: string,
    public postDate: string,
    public postPhoto: string,
    public postPhotoSmall: string,
    public content: string,
    public contentShort: string,
    public author: GdgTeamMember,
    public keywords: string,
    linksArray?: any[],
    photosArray?: any[]
  ) {
    if (linksArray && linksArray.length > 0) {
      this.links = linksArray.map(item => {
        return new GdgBlogPostLink(
          item.fields.link,
          item.fields.locale,
          item.fields.blogPost.sys.id
        );
      });
    }

    if (photosArray && photosArray.length > 0) {
      this.photos = photosArray.map(item => {
        return item.fields.file.url;
      });
      //  console.log('GdgBlog.constructor(): found photos = ', this.photos);
    }
  }

  getLink(locale: string): string {
    const link = this.links
      .filter((item: GdgBlogPostLink) => item.locale === locale)
      .map((item: GdgBlogPostLink) => {
        return item.link;
      })[0];

    if (link) {
      return link;
    } else {
      return "";
    }
  }
}
