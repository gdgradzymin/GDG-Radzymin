export interface GdgEventModel {
  title: string;
  description: string;
  shortDescription: string;
  isOrganizerGdgRadzymin: boolean;
  eventDate?: string;
  location?: GdgLocationModel;
  eventAddress?: string;
  meetupLink?: string;
}

export interface GdgLocationModel {
  lat: number;
  lon: number;
}

export class GdgLocation implements GdgLocationModel {
  constructor(public lat: number, public lon: number) {}
}

export class GdgEvent implements GdgEventModel {
  public location: GdgLocationModel;
  constructor(
    public title: string,
    public description: string,
    public shortDescription: string,
    public isOrganizerGdgRadzymin: boolean,
    public eventDate: string,
    locationLon: number,
    locationLat: number,
    public eventAddress: string,
    public meetupLink: string
  ) {
    this.location = new GdgLocation(locationLat, locationLon);
  }

  isPastEvent(): boolean {
    const today = new Date();
    if (this.eventDate && this.eventDate < today.toJSON()) {
      return true;
    } else {
      return false;
    }
  }
}
