import { Injectable } from '@angular/core';
import { createClient, Entry, EntryCollection } from 'contentful';
import { environment } from '../../environments/environment.prod';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as marked from 'marked';
import { GdgEvent } from '../models/gdg-event.model';
import { GdgTeamMember } from '../models/gdg-team-member.model';

export enum GdgContentTypes {
  EVENT = 'event',
  TEAM_MEMBER = 'teamMember',
  CONTACT_INFO = 'contactInfo'
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private clinet = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token
  });
  constructor() {}

  logContent(contentId: string): void {
    this.clinet.getEntry(contentId).then(entry => {
      console.log(entry);
    });
  }

  logEvents(): void {
    this.clinet
      .getEntries({
        content_type: GdgContentTypes.EVENT,
        order: 'sys.createdAt'
      })
      .then(entry => console.log('events: ', entry.items));
  }

  logTeamMembers(): void {
    this.clinet
      .getEntries({
        content_type: GdgContentTypes.TEAM_MEMBER,
        order: 'sys.createdAt'
      })
      .then(entry => console.log('teamMembers: ', entry.items));
  }

  logContactInfo(): void {
    this.clinet
      .getEntries({
        content_type: GdgContentTypes.CONTACT_INFO,
        order: 'sys.createdAt'
      })
      .then(entry => console.log('contactInfo: ', entry.items));
  }


  getContent(contentId: string) {
    const promise = this.clinet.getEntry(contentId);
    return from(promise).pipe(map(entry => entry.fields));
  }

  getEvents(howMany: number): Observable<GdgEvent[]> {
    const promise: Promise<
      EntryCollection<GdgEvent[]>
    > = this.clinet.getEntries({
      content_type: GdgContentTypes.EVENT,
      order: '-sys.createdAt',
      limit: howMany
    });
    return from(promise).pipe(
      map((entries: EntryCollection<GdgEvent>) => {
        return entries.items.map(item => {
          return new GdgEvent(
            item.fields.title,
            item.fields.description,
            item.fields.eventDate,
            item.fields.location ? item.fields.location.lon : undefined,
            item.fields.location ? item.fields.location.lat : undefined,
            item.fields.eventAddress,
            item.fields.meetupLink
          );
        });
      })
    );
  }

  getEventsFull(howMany: number): Observable<GdgEvent[]> {
    const promise: Promise<
      EntryCollection<GdgEvent[]>
    > = this.clinet.getEntries({
      content_type: GdgContentTypes.EVENT,
      order: '-sys.createdAt',
      limit: howMany
    });
    return from(promise).pipe(
      map((entries: EntryCollection<GdgEvent>) => {
        return entries.items;
      })
    );
  }

  getTeamMembers(howMany: number): Observable<GdgTeamMember[]> {
    const promise: Promise<
      EntryCollection<GdgTeamMember[]>
    > = this.clinet.getEntries({
      content_type: GdgContentTypes.TEAM_MEMBER,
      order: 'sys.createdAt',
      limit: howMany
    });
    return from(promise).pipe(
      map((entries: EntryCollection<any>) => {
        return entries.items.map(item => {
          return new GdgTeamMember(
            item.fields.name,
            item.fields.tags,
            item.fields.profilePhoto ? item.fields.profilePhoto.fields.file.url : undefined,
            item.fields.linkedinUrl,
            item.fields.twitterUrl,
            item.fields.githubUrl
          );
        });
      })
    );
  }

  getTeamMembersFull(howMany: number): Observable<GdgTeamMember[]> {
    const promise: Promise<
      EntryCollection<GdgTeamMember[]>
    > = this.clinet.getEntries({
      content_type: GdgContentTypes.TEAM_MEMBER,
      order: 'sys.createdAt',
      limit: howMany
    });
    return from(promise).pipe(
      map((entries: EntryCollection<GdgTeamMember>) => {
        return entries.items;
      })
    );
  }

  markdownToHtml(md: string) {
    return marked(md);
  }
}
