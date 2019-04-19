export interface GdgBlogPostLinkModel {
  link: string;
  locale: string;
  blogPostId: string;
}

export class GdgBlogPostLink implements GdgBlogPostLinkModel {
  constructor(
    public link: string,
    public locale: string,
    public blogPostId: string
  ) {}
}
