import { GdgImage } from "./gdg-image.model";

export interface IGdgDevFest {
  isCurrent: boolean;
  year: number;
  title: string;
  eventStartDate: string;
  eventEndDate: string;
  meetupLink: string;
  descriptionTitle?: string;
  description?: string;
  descriptionImage?: GdgImage;
  shareTitle?: string;
  share?: string;
  shareImage?: GdgImage;
  
}

export class GdgDevFest implements IGdgDevFest {
  constructor(
    public isCurrent: boolean,
    public year: number,
    public title: string,
    public eventStartDate: string,
    public eventEndDate: string,
    public meetupLink: string,
    public descriptionTitle?: string,
    public description?: string,
    public descriptionImage?: GdgImage,
    public shareTitle?: string,
    public share?: string,
    public shareImage?: GdgImage
  ) {
    console.log("descTitle from constr: " + this.descriptionTitle);
    console.log("descImage from constr: " + this.descriptionImage.imgUrl);
  }

  getEventStartDateInMilisec(): number {
    const date = new Date(this.eventStartDate);
    const dateMilisec = date.getTime();
    return dateMilisec;
  }
}
