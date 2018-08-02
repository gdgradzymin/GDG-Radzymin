import { GdgTeamMember } from './gdg-team-member.model';

export interface GdgBlogModel {
  title: string;
  link: string;
  postDate: string;
  postPhoto: string;
  postPhotoSmall: string;
  content: string;
  contentShort: string;
  author: GdgTeamMember;
  keywords: string;
  photos?: string[];
}

export class GdgBlog implements GdgBlogModel {
  public photos: string[] = [];
  constructor(
    public title: string,
    public link: string,
    public postDate: string,
    public postPhoto: string,
    public postPhotoSmall: string,
    public content: string,
    public contentShort: string,
    public author: GdgTeamMember,
    public keywords: string,
    public photosArray?: any[]
  ) {
    if (photosArray && photosArray.length > 0) {
      this.photos = photosArray.map(item => {
        return item.fields.file.url;
      });
    //  console.log('GdgBlog.constructor(): found photos = ', this.photos);
    }
  }
}
