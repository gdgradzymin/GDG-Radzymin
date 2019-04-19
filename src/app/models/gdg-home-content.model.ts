import { GdgImage } from './gdg-image.model';

export interface GdgHomeContentModel {
  title: string;
  order: number;
  active: boolean;
  content: string;
  image?: GdgImage;
}

export class GdgHomeContent implements GdgHomeContentModel {
  constructor(
    public title: string,
    public order: number,
    public active: boolean,
    public content: string,
    public image?: GdgImage
  ) {}
}
