import { Injectable } from '@angular/core';
import { createClient, Entry, EntryCollection } from 'contentful';
import { environment } from '../../environments/environment.prod';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as marked from 'marked';
import { GdgEvent } from '../models/gdg-event.model';
import { GdgTeamMember } from '../models/gdg-team-member.model';
import { SettingsService } from './settings.service';
import { GdgBlog } from '../models/gdg-blog.model';

export enum GdgContentTypes {
  EVENT = 'event',
  TEAM_MEMBER = 'teamMember',
  CONTACT_INFO = 'contactInfo',
  BLOG = 'blog'
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private clinet = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token
  });
  constructor(private settings: SettingsService) {}

  logContent(contentId: string): void {
    this.clinet.getEntry(contentId).then(entry => {
      console.log(entry);
    });
  }

  logEvents(): void {
    this.clinet
      .getEntries({
        content_type: GdgContentTypes.EVENT,
        order: 'sys.createdAt',
        locale: this.settings.getLocale()
      })
      .then(entry => console.log('events: ', entry.items));
  }

  logTeamMembers(): void {
    this.clinet
      .getEntries({
        content_type: GdgContentTypes.TEAM_MEMBER,
        locale: this.settings.getLocale(),
        order: 'sys.createdAt'
      })
      .then(entry => console.log('teamMembers: ', entry.items));
  }

  logBlogPosts(): void {
    this.clinet
      .getEntries({
        content_type: GdgContentTypes.BLOG,
        locale: this.settings.getLocale(),
        order: 'sys.createdAt'
      })
      .then(entry => console.log('blogPosts: ', entry.items));
  }

  logContactInfo(): void {
    this.clinet
      .getEntries({
        content_type: GdgContentTypes.CONTACT_INFO,
        locale: this.settings.getLocale(),
        order: 'sys.createdAt'
      })
      .then(entry => console.log('contactInfo: ', entry.items));
  }

  getContent(contentId: string) {
    const promise = this.clinet.getEntry(contentId);
    return from(promise).pipe(map(entry => entry.fields));
  }

  getEvents(
    howMany: number,
    showPast: boolean,
    gdgRadzyminOnly: boolean,
    sortAsc: boolean
  ): Observable<GdgEvent[]> {
    const query = {
      content_type: GdgContentTypes.EVENT,
      locale: this.settings.getLocale(),
      limit: howMany
    };
    if (!showPast) {
      const today = new Date();
      Object.assign(query, { 'fields.hiddenEventDate[gt]': today.toJSON() });
    }

    if (gdgRadzyminOnly) {
      Object.assign(query, { 'fields.isOrganizerGdgRadzymin': true });
    }

    const orderBy = sortAsc
      ? 'fields.hiddenEventDate'
      : '-fields.hiddenEventDate';
    Object.assign(query, { order: orderBy });

    const promise: Promise<
      EntryCollection<GdgEvent[]>
    > = this.clinet.getEntries(query);
    return from(promise).pipe(
      map((entries: EntryCollection<GdgEvent>) => {
        return entries.items.map(item => {
          return new GdgEvent(
            item.fields.title,
            item.fields.description,
            item.fields.shortDescription,
            item.fields.isOrganizerGdgRadzymin,
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

  getBlogPosts(howMany: number, sortAsc: boolean): Observable<GdgBlog[]> {
    const query = {
      content_type: GdgContentTypes.BLOG,
      locale: this.settings.getLocale(),
      limit: howMany
    };
    const orderBy = sortAsc ? 'fields.postDate' : '-fields.postDate';
    Object.assign(query, { order: orderBy });

    const promise: Promise<EntryCollection<GdgBlog[]>> = this.clinet.getEntries(
      query
    );
    return from(promise).pipe(
      map((entries: EntryCollection<any>) => {
        return entries.items.map(item => {
          return new GdgBlog(
            item.fields.title,
            item.fields.postDate,
            item.fields.content,
            item.fields.photos ? item.fields.photos : undefined
          );
        });
      })
    );
  }

  getBlogPostsFull(howMany: number): Observable<GdgBlog[]> {
    const promise: Promise<EntryCollection<GdgBlog[]>> = this.clinet.getEntries(
      {
        content_type: GdgContentTypes.BLOG,
        locale: this.settings.getLocale(),
        order: '-sys.createdAt',
        limit: howMany
      }
    );
    return from(promise).pipe(
      map((entries: EntryCollection<GdgBlog>) => {
        return entries.items;
      })
    );
  }

  getEventsFull(howMany: number): Observable<GdgEvent[]> {
    const promise: Promise<
      EntryCollection<GdgEvent[]>
    > = this.clinet.getEntries({
      content_type: GdgContentTypes.EVENT,
      locale: this.settings.getLocale(),
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
      locale: this.settings.getLocale(),
      order: 'sys.createdAt',
      limit: howMany
    });
    return from(promise).pipe(
      map((entries: EntryCollection<any>) => {
        return entries.items.map(item => {
          return new GdgTeamMember(
            item.fields.name,
            item.fields.tags,
            item.fields.profilePhoto
              ? item.fields.profilePhoto.fields.file.url
              : undefined,
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
      locale: this.settings.getLocale(),
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
