export interface GdgImageModel {
  imgUrl: string;
  imgTitle: string;
  imgDesc?: string;
}

export class GdgImage implements GdgImageModel {
  constructor(
    public imgUrl: string,
    public imgTitle: string,
    public imgDesc?: string
  ) {}
}
