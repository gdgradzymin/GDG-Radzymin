export interface GdgBlogModel {
  title: string;
  postDate: string;
  content: string;
  photos?: string[];
}

export class GdgBlog implements GdgBlogModel {
  constructor(
    public title: string,
    public postDate: string,
    public content: string,
    public photos?: string[]
  ) {}
}
