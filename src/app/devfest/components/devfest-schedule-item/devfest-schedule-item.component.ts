import { Component, OnInit, Input } from "@angular/core";
import { GdgDevFestEventItem } from "~/app/models/gdg-devfest-event-item.model";
import { faClock, faComments } from "@fortawesome/fontawesome-free-regular";
import {
  faUserAlt,
  faMicrophoneAlt,
  faUtensils,
  faQuestionCircle,
  faIdCard,
  faCocktail,
  faChild,
  faTrophy,
  faFilm,
  faDoorOpen,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

export enum EventItemIconWeb {
  PRESENTATION = "fa-microphone-alt",
  BREAK = "fa-comments",
  EATING = "fa-utensils",
  QA = "fa-question-circle",
  REGISTRATION = "fa-id-card",
  PARTY = "fa-cocktail",
  WELCOME = "fa-child",
  AWARD = "fa-trophy",
  MOVIE = "fa-film",
  FINAL = "fa-door-open"
}

@Component({
  selector: "app-devfest-schedule-item",
  templateUrl: "./devfest-schedule-item.component.html",
  styleUrls: ["./devfest-schedule-item.component.scss"]
})
export class DevfestScheduleItemComponent implements OnInit {
  @Input()
  eventItem: GdgDevFestEventItem;

  faClock = faClock;
  faUserAlt = faUserAlt;
  faComments = faComments;
  faMicrophoneAlt = faMicrophoneAlt;
  faUtensils = faUtensils;
  faQuestionCircle = faQuestionCircle;
  faIdCard = faIdCard;
  faCocktail = faCocktail;
  faChild = faChild;
  faTrophy = faTrophy;
  faFilm = faFilm;
  faDoorOpen = faDoorOpen;

  constructor() {}

  ngOnInit() {}

  getEventIcon(): IconDefinition {
    switch (this.eventItem.getEventItemIcon(true).toLowerCase()) {
      case EventItemIconWeb.BREAK:
        return this.faComments;
      case EventItemIconWeb.EATING:
        return this.faUtensils;
      case EventItemIconWeb.PARTY:
        return this.faCocktail;
      case EventItemIconWeb.PRESENTATION:
        return this.faMicrophoneAlt;
      case EventItemIconWeb.QA:
        return this.faQuestionCircle;
      case EventItemIconWeb.REGISTRATION:
        return this.faIdCard;
      case EventItemIconWeb.WELCOME:
        return this.faChild;
      case EventItemIconWeb.AWARD:
        return this.faTrophy;
      case EventItemIconWeb.MOVIE:
        return this.faFilm;
      case EventItemIconWeb.FINAL:
        return this.faDoorOpen;
      default:
        return null;
    }
  }
}
