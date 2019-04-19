import { GdgImage } from "./gdg-image.model";
import { GdgDevFestSpeaker } from "./gdg-devfest-speaker.model";
import { GdgDevFestEventItem } from "./gdg-devfest-event-item.model";

export interface IGdgDevFestSpeakerEvent {
  speakerName: string;
  speakerRole: string;
  speakerDescription: string;
  presentations: GdgDevFestEventItem[];
  speakerPhoto?: GdgImage;
}

export class GdgDevFestSpeakerEvent implements IGdgDevFestSpeakerEvent {
  speakerName: string;
  speakerRole: string;
  speakerDescription: string;
  presentations: GdgDevFestEventItem[];
  speakerPhoto?: GdgImage;

  constructor(speaker: GdgDevFestSpeaker, presentations: GdgDevFestEventItem[]) {
    this.speakerName = speaker.name;
    this.speakerRole = speaker.role;
    this.speakerDescription = speaker.description;
    this.presentations = presentations;
    this.speakerPhoto = speaker.photo;
  }
}
