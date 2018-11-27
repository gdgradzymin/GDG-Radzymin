import { GdgImage } from "./gdg-image.model";

export interface IGdgDevFestSpeaker {
  name: string;
  role: string;
  photo?: GdgImage;
  description?: string;
}

export class GdgDevFestSpeaker implements IGdgDevFestSpeaker {
  photo: GdgImage;

  constructor(
    public name: string,
    public role: string,
    imgUrl: string,
    imgTitle: string,
    imgDesc: string,
    public description?: string
  ) {
    this.photo = new GdgImage(imgUrl, imgTitle, imgDesc);
  }
}
