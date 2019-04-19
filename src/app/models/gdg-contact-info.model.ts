export interface GdgContactInfoModel {
  name: string;
  siteUrl?: string;
  email: string;
  phone?: string;
  meetupUrl?: string;
  facebookUrl?: string;
  twitterUrl: string;
  youtubeUrl?: string;
  githubUrl?: string;
  active: boolean;
}

export class GdgContactInfo implements GdgContactInfoModel {
  constructor(
    public name: string,
    public email: string,
    public active: boolean,
    public phone: string,
    public siteUrl: string,
    public meetupUrl: string,
    public facebookUrl: string,
    public twitterUrl: string,
    public youtubeUrl: string,
    public githubUrl: string
  ) {}
}
