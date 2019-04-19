import { Injectable } from "@angular/core";
import { BehaviorSubject, of, forkJoin } from "rxjs";
import { GdgHomeContent } from "../models/gdg-home-content.model";
import { GdgContactInfo } from "../models/gdg-contact-info.model";
import { ContentfulService } from "./contentful.service";
import { Observable } from "rxjs";
import { GdgEvent } from "../models/gdg-event.model";
import * as _ from "lodash";
import { SettingsService, Lang } from "./settings.service";
import { GdgTeamMember } from "../models/gdg-team-member.model";
import { GdgDevFest } from "../models/gdg-devfest.model";
import { GdgDevFestEventItem } from "../models/gdg-devfest-event-item.model";
import { GdgDevFestSpeaker } from "../models/gdg-devfest-speaker.model";
import { GdgBlogPost } from "../models/gdg-blog-post.model";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

export const INITIAL_STATE_CONTACT_INFO: GdgContactInfo = {
  name: "GDG Radzymin",
  email: "gdgradzymin@gmail.com",
  active: true,
  phone: "+48600530302",
  siteUrl: "https://gdgradzymin.pl",
  meetupUrl: "https://www.meetup.com/GDG-Radzymin/",
  facebookUrl: "https://www.facebook.com/groups/gdgradzymin/",
  twitterUrl: "https://twitter.com/GDGRadzymin",
  youtubeUrl: "https://www.youtube.com/channel/UCEp5xyHQdcmYylLIaskIPEA",
  githubUrl: "https://github.com/sebastiandenis/GDG-Radzymin"
};

@Injectable({
  providedIn: "root"
})
export class StateService {
  private homeItems$: BehaviorSubject<GdgHomeContent[]> = new BehaviorSubject(
    []
  );
  private contactInfo$: BehaviorSubject<GdgContactInfo> = new BehaviorSubject(
    INITIAL_STATE_CONTACT_INFO
  );

  private events$: BehaviorSubject<GdgEvent[]> = new BehaviorSubject([]);
  private filteredEvents$: BehaviorSubject<GdgEvent[]> = new BehaviorSubject(
    []
  );
  private teamMembers$: BehaviorSubject<GdgTeamMember[]> = new BehaviorSubject(
    []
  );

  private eventsFilterGdgRadzyminOnly$: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);
  private eventsFilterShowPastEvents$: BehaviorSubject<
    boolean
  > = new BehaviorSubject(true);
  private eventsFilterSortAsc$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  private devFests$: BehaviorSubject<GdgDevFest[]> = new BehaviorSubject([]);
  private devFestEventItems$: BehaviorSubject<
    GdgDevFestEventItem[]
  > = new BehaviorSubject([]);
  private devFestSpeakers$: BehaviorSubject<
    GdgDevFestSpeaker[]
  > = new BehaviorSubject([]);

  private blogPosts$: BehaviorSubject<GdgBlogPost[]> = new BehaviorSubject([]);

  constructor(
    private contentful: ContentfulService,
    private settings: SettingsService,
  ) {
    this.settings
      .getCurrentLang()
      .pipe(
        switchMap((lang: Lang) => {
          return forkJoin(
            forkJoin([
              this.contentful.getContactInfo(),
              this.contentful.getHomeContent(100, true, true),
              this.contentful.getEvents(100, true, false, false),
              this.contentful.getTeamMembers(100),
              this.contentful.getDevFests(1, true, true),
              this.contentful.getGdgDevFestEventItems(100)
            ]),
            forkJoin([
              this.contentful.getGdgDevFestSpeakers(100),
              this.contentful.getBlogPosts(100, false)
            ])
          );
        })
      )
      .subscribe(([r1, r2]) => {
        this.contactInfo$.next(r1[0]);
        this.homeItems$.next(r1[1]);
        this.events$.next(r1[2]);
        this.filteredEvents$.next(this.events$.getValue().slice(0));
        this.teamMembers$.next(r1[3]);
        this.devFests$.next(r1[4]);
        this.devFestEventItems$.next(r1[5]);
        this.devFestSpeakers$.next(r2[0]);
        this.blogPosts$.next(r2[1]);
      });
  }

  getTeamMembers(): Observable<GdgTeamMember[]> {
    return this.teamMembers$.asObservable();
  }

  getHomeItems(): Observable<GdgHomeContent[]> {
    return this.homeItems$.asObservable();
  }

  getContactInfo(): Observable<GdgContactInfo> {
    return this.contactInfo$.asObservable();
  }

  getFilteredEvents(): Observable<GdgEvent[]> {
    return this.filteredEvents$.asObservable();
  }

  getEventsFilterGdgRadzyminOnly(): Observable<boolean> {
    return this.eventsFilterGdgRadzyminOnly$.asObservable();
  }

  setEventsFilterGdgRadzyminOnly(gdgRadzyminOnly: boolean): void {
    this.eventsFilterGdgRadzyminOnly$.next(gdgRadzyminOnly);
    this.filterEvents();
  }

  getEventsFilterShowPastEvents(): Observable<boolean> {
    return this.eventsFilterShowPastEvents$.asObservable();
  }
  setEventsFilterShowPastEvents(showPastEvents: boolean): void {
    this.eventsFilterShowPastEvents$.next(showPastEvents);
    this.filterEvents();
  }

  getEventsFilterSortAsc(): Observable<boolean> {
    return this.eventsFilterSortAsc$.asObservable();
  }

  setEventsFilterSortAsc(sortAsc: boolean): void {
    this.eventsFilterSortAsc$.next(sortAsc);
    this.filterEvents();
  }

  getDevFests(): Observable<GdgDevFest[]> {
    return this.devFests$.asObservable();
  }

  getDevFestEventItems(): Observable<GdgDevFestEventItem[]> {
    return this.devFestEventItems$.asObservable();
  }

  getDevFestSpeakers(): Observable<GdgDevFestSpeaker[]> {
    return this.devFestSpeakers$.asObservable();
  }

  getBlogPosts(): Observable<GdgBlogPost[]> {
    return this.blogPosts$.asObservable();
  }

  private filterEvents(howMany: number = 100): void {
    let filteredEvents: GdgEvent[] = this.events$
      .getValue()
      .filter((event: GdgEvent) => {
        return (
          event.isPastEvent() === this.eventsFilterShowPastEvents$.getValue()
        );
      });
    if (this.eventsFilterGdgRadzyminOnly$.getValue()) {
      filteredEvents = filteredEvents.filter((event: GdgEvent) => {
        return (
          event.isOrganizerGdgRadzymin ===
          this.eventsFilterGdgRadzyminOnly$.getValue()
        );
      });
    }

    if (this.eventsFilterSortAsc$.getValue()) {
      filteredEvents = _.orderBy(filteredEvents, ["eventDate"], ["asc"]);
    } else {
      filteredEvents = _.orderBy(filteredEvents, ["eventDate"], ["desc"]);
    }

    if (filteredEvents.length > howMany - 1) {
      filteredEvents.splice(howMany - 1);
    }

    this.filteredEvents$.next(filteredEvents);
  }


}
