import { GdgDevFestSpeaker } from "./gdg-devfest-speaker.model";

export interface IGdgDevFestEventItem {
  title: string;
  type: string;
  category: string;
  shortDescription?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  presenter?: GdgDevFestSpeaker;
}

export enum EventItemIcon {
  PRESENTATION = 0xf3c9,
  BREAK = 0xf086,
  EATING = 0xf2e7,
  QA = 0xf059,
  REGISTRATION = 0xf2c2,
  PARTY = 0xf561,
  WELCOME = 0xf1ae,
  AWARD = 0xf091,
  MOVIE = 0xf008,
  FINAL = 0xf52b
}

export enum EventItemIconWeb {
  PRESENTATION = "fa-microphone-alt",
  BREAK = "fa-comments",
  EATING = "fa-tensils",
  QA = "fa-question-circle",
  REGISTRATION = "fa-id-card",
  PARTY = "fa-cocktail",
  WELCOME = "fa-child",
  AWARD = "fa-trophy",
  MOVIE = "fa-film",
  FINAL = "fa-door-open"
}

export class GdgDevFestEventItem implements IGdgDevFestEventItem {
  constructor(
    public title: string,
    public type: string,
    public category: string,
    public shortDescription: string,
    public description: string,
    public startDate: string,
    public endDate: string,
    public presenter: GdgDevFestSpeaker
  ) {}

  getEventDuration(): number {
    if (this.startDate && this.endDate) {
      const start: Date = new Date(this.startDate);
      const end: Date = new Date(this.endDate);
      const duration = end.valueOf() - start.valueOf();

      return duration / 1000 / 60;
    } else {
      return 0;
    }
  }

  getEventItemIcon(isWeb = true): string {
    switch (this.category.toLowerCase()) {
      case "break":
        return isWeb
          ? EventItemIconWeb.BREAK
          : String.fromCharCode(EventItemIcon.BREAK);
      case "eating":
        return isWeb
          ? EventItemIconWeb.EATING
          : String.fromCharCode(EventItemIcon.EATING);
      case "party":
        return isWeb
          ? EventItemIconWeb.PARTY
          : String.fromCharCode(EventItemIcon.PARTY);
      case "presentation":
        return isWeb
          ? EventItemIconWeb.PRESENTATION
          : String.fromCharCode(EventItemIcon.PRESENTATION);
      case "qa":
        return isWeb
          ? EventItemIconWeb.QA
          : String.fromCharCode(EventItemIcon.QA);
      case "registration":
        return isWeb
          ? EventItemIconWeb.REGISTRATION
          : String.fromCharCode(EventItemIcon.REGISTRATION);
      case "welcome":
        return isWeb
          ? EventItemIconWeb.WELCOME
          : String.fromCharCode(EventItemIcon.WELCOME);
      case "award":
        return isWeb
          ? EventItemIconWeb.AWARD
          : String.fromCharCode(EventItemIcon.AWARD);
      case "movie":
        return isWeb
          ? EventItemIconWeb.MOVIE
          : String.fromCharCode(EventItemIcon.MOVIE);
      case "final":
        return isWeb
          ? EventItemIconWeb.FINAL
          : String.fromCharCode(EventItemIcon.FINAL);
      default:
        return "";
    }
  }
}
