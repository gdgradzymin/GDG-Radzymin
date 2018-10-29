import { Injectable } from "@angular/core";
import { createClient, EntryCollection, Entry, Asset } from "contentful";
import { environment } from "../../environments/environment.prod";
import { from, Observable, of, empty, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as marked from "marked";
import { GdgEvent } from "../models/gdg-event.model";
import { GdgTeamMember } from "../models/gdg-team-member.model";
import { SettingsService } from "./settings.service";
import { GdgBlogPost } from "../models/gdg-blog-post.model";
import { GdgContactInfo } from "../models/gdg-contact-info.model";
import { GdgBlogPostLink } from "../models/gdg-blog-post-link.model";
import { GdgHomeContent } from "../models/gdg-home-content.model";
import { GdgImage } from "../models/gdg-image.model";
import { HttpClient } from "@angular/common/http";

export enum GdgContentTypes {
  EVENT = "event",
  TEAM_MEMBER = "teamMember",
  CONTACT_INFO = "contactInfo",
  BLOG_POST = "blogPost",
  BLOG_POST_LINK = "blogPostLink",
  HOME_CONTENT = "homeContent"
}

@Injectable({
  providedIn: "root"
})
export class ContentfulService {
  private readonly CONTENTFUL_URL = "https://cdn.contentful.com";
  private readonly CONTENTFUL_URL_ENTRIES = `${this.CONTENTFUL_URL}/spaces/${
    environment.contentful.spaceId
  }/environments/master/entries?access_token=${environment.contentful.token}`;

  // private clinet = createClient({
  //   space: environment.contentful.spaceId,
  //   accessToken: environment.contentful.token
  // });

  constructor(private settings: SettingsService, private http: HttpClient) {}

  getContentfulUrlEntry(entryId: string): string {
    return `https://cdn.contentful.com/spaces/${
      environment.contentful.spaceId
    }/environments/master/entries/${entryId}?access_token=${
      environment.contentful.token
    }`;
  }

  getContentfulUrlParameters(params: Object): string {
    return Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
  }

  logContent(contentId: string): void {
    // this.clinet.getEntry(contentId).then(entry => {
    //   console.log(entry);
    // });

    this.http
      .get(`${this.getContentfulUrlEntry(contentId)}`)
      .subscribe(
        resp => console.log("Content from logContent: ", resp),
        err => console.log("An error in logContent: ", err),
        () => console.log("logContent completed!")
      );
  }

  logEvents(): void {
    // this.clinet
    //   .getEntries({
    //     content_type: GdgContentTypes.EVENT,
    //     order: 'sys.createdAt',
    //     locale: this.settings.getLocale()
    //   })
    //   .then(entry => console.log('events: ', entry.items));

    this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&content_type=${
          GdgContentTypes.EVENT
        }&locale=${this.settings.getLocale()}&order=sys.createdAt`
      )
      .subscribe(
        resp => console.log("Content from logEvents: ", resp),
        err => console.log("An error in logEvents: ", err),
        () => console.log("logEvents completed!")
      );
  }

  logTeamMembers(): void {
    // this.clinet
    //   .getEntries({
    //     content_type: GdgContentTypes.TEAM_MEMBER,
    //     locale: this.settings.getLocale(),
    //     order: 'sys.createdAt'
    //   })
    //   .then(entry => console.log('teamMembers: ', entry.items));

    this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&content_type=${
          GdgContentTypes.TEAM_MEMBER
        }&locale=${this.settings.getLocale()}&order=sys.createdAt`
      )
      .subscribe(
        resp => console.log("Content from logTeamMembers: ", resp),
        err => console.log("An error in logTeamMembers: ", err),
        () => console.log("logTeamMembers completed!")
      );
  }

  logBlogPosts(): void {
    // this.clinet
    //   .getEntries({
    //     content_type: GdgContentTypes.BLOG_POST,
    //     locale: this.settings.getLocale(),
    //     order: 'sys.createdAt'
    //   })
    //   .then(entry => console.log('blogPosts: ', entry.items));

    this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&content_type=${
          GdgContentTypes.BLOG_POST
        }&locale=${this.settings.getLocale()}&order=sys.createdAt`
      )
      .subscribe(
        resp => console.log("Content from logBlogPosts: ", resp),
        err => console.log("An error in logBlogPosts: ", err),
        () => console.log("logBlogPosts completed!")
      );
  }

  logContactInfo(): void {
    // this.clinet
    //   .getEntries({
    //     content_type: GdgContentTypes.CONTACT_INFO,
    //     locale: this.settings.getLocale(),
    //     order: 'sys.createdAt'
    //   })
    //   .then(entry => console.log('contactInfo: ', entry.items));

    this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&content_type=${
          GdgContentTypes.CONTACT_INFO
        }&locale=${this.settings.getLocale()}&order=sys.createdAt`
      )
      .subscribe(
        resp => console.log("Content from logContactInfo: ", resp),
        err => console.log("An error in logContactInfo: ", err),
        () => console.log("logContactInfo completed!")
      );
  }

  logHomeContent(): void {
    // this.clinet
    //   .getEntries({
    //     content_type: GdgContentTypes.HOME_CONTENT,
    //     locale: this.settings.getLocale(),
    //     order: 'sys.createdAt'
    //   })
    //   .then(entry => console.log('homeContent: ', entry.items));

    // tslint:disable-next-line:max-line-length
    this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&content_type=${
          GdgContentTypes.HOME_CONTENT
        }&locale=${this.settings.getLocale()}&order=sys.createdAt`
      )
      .subscribe(
        resp => console.log("Content from logHomeContent: ", resp),
        err => console.log("An error in logHomeContent: ", err),
        () => console.log("logHomeContent completed!")
      );
  }

  getContent(contentId: string): Observable<any> {
    // const promise = this.clinet.getEntry(contentId);
    // return from(promise).pipe(map(entry => entry.fields));

    return this.http
      .get(`${this.getContentfulUrlEntry(contentId)}`)
      .pipe(map((entry: Entry<any>) => entry.fields));
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
      Object.assign(query, { "fields.hiddenEventDate[gt]": today.toJSON() });
    }

    if (gdgRadzyminOnly) {
      Object.assign(query, { "fields.isOrganizerGdgRadzymin": true });
    }

    const orderBy = sortAsc
      ? "fields.hiddenEventDate"
      : "-fields.hiddenEventDate";
    Object.assign(query, { order: orderBy });

    return this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&${this.getContentfulUrlParameters(
          query
        )}`,
        { responseType: "json" }
      )
      .pipe(
        map((entries: EntryCollection<GdgEvent>) => {
          return entries.items.map((item: Entry<GdgEvent>) => {
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

    // const promise: Promise<EntryCollection<GdgEvent>> = this.clinet.getEntries(
    //   query
    // );
    // return from(promise).pipe(
    //   map((entries: EntryCollection<GdgEvent>) => {
    //     return entries.items.map(item => {
    //       return new GdgEvent(
    //         item.fields.title,
    //         item.fields.description,
    //         item.fields.shortDescription,
    //         item.fields.isOrganizerGdgRadzymin,
    //         item.fields.eventDate,
    //         item.fields.location ? item.fields.location.lon : undefined,
    //         item.fields.location ? item.fields.location.lat : undefined,
    //         item.fields.eventAddress,
    //         item.fields.meetupLink
    //       );
    //     });
    //   })
    // );
  }

  getBlogPosts(howMany: number, sortAsc: boolean): Observable<GdgBlogPost[]> {
    const query = {
      content_type: GdgContentTypes.BLOG_POST,
      locale: this.settings.getLocale(),
      limit: howMany,
      include: 1
    };
    const orderBy = sortAsc ? "fields.postDate" : "-fields.postDate";
    Object.assign(query, { order: orderBy });

    return this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&${this.getContentfulUrlParameters(
          query
        )}`,
        { responseType: "json" }
      )
      .pipe(
        map((entries: EntryCollection<any>) => {
          const assets: Asset[] = entries.includes.Asset;
          const links: Entry<any>[] = entries.includes.Entry;
          return entries.items.map(item => {
            const author = this.getEntryById(links, item.fields.author.sys.id);
            const authorPhoto = this.getAssetById(
              assets,
              author.fields.profilePhoto.sys.id
            );
            const photoSmall = this.getAssetById(
              assets,
              item.fields.postPhotoSmall.sys.id
            );
            const postPhoto = this.getAssetById(
              assets,
              item.fields.postPhoto.sys.id
            );
            const blogPostLinks = this.getEntriesByContentType(
              links,
              GdgContentTypes.BLOG_POST_LINK,
              this.settings.getLocale()
            ).filter((itemPostLink: Entry<any>) => {
              return itemPostLink.fields.blogPost.sys.id === item.sys.id;
            });

            return new GdgBlogPost(
              item.sys.id,
              item.fields.title,
              item.fields.postDate,
              postPhoto.fields.file.url,
              photoSmall.fields.file.url,
              item.fields.content,
              item.fields.contentShort,
              new GdgTeamMember(
                author.fields.name,
                author.fields.tags,
                authorPhoto ? authorPhoto.fields.file.url : undefined,
                author.fields.linkedinUrl,
                author.fields.twitterUrl,
                author.fields.githubUrl
              ),
              item.fields.keywords,
              blogPostLinks ? blogPostLinks : undefined,
              undefined
            );
          });
        }),
        catchError((error: any, caught: Observable<GdgBlogPost[]>) => {
          console.log("error during fetching blogPosts: ", error);
          return empty();
        })
      );

    // const promise: Promise<
    //   EntryCollection<GdgBlogPost[]>
    // > = this.clinet.getEntries(query).catch(error => {
    //   console.log('błąd pobrania danych');
    //   return null;
    // });
    // return from(promise).pipe(
    //   map((entries: EntryCollection<any>) => {
    //     return entries.items.map(item => {
    //       return new GdgBlogPost(
    //         item.sys.id,
    //         item.fields.title,
    //         item.fields.postDate,
    //         item.fields.postPhoto.fields.file.url,
    //         item.fields.postPhotoSmall.fields.file.url,
    //         item.fields.content,
    //         item.fields.contentShort,
    //         new GdgTeamMember(
    //           item.fields.author.fields.name,
    //           item.fields.author.fields.tags,
    //           item.fields.author.fields.profilePhoto
    //             ? item.fields.author.fields.profilePhoto.fields.file.url
    //             : undefined,
    //           item.fields.author.fields.linkedinUrl,
    //           item.fields.author.fields.twitterUrl,
    //           item.fields.author.fields.githubUrl
    //         ),
    //         item.fields.keywords,
    //         item.fields.links ? item.fields.links : undefined,
    //         item.fields.photos ? item.fields.photos : undefined
    //       );
    //     });
    //   }),
    //   catchError((error: any, caught: Observable<GdgBlogPost[]>) => {
    //     return empty();
    //   })
    // );
  }

  // getBlogPostsFull(howMany: number): Observable<GdgBlogPost[]> {
  //   const promise: Promise<
  //     EntryCollection<GdgBlogPost[]>
  //   > = this.clinet.getEntries({
  //     content_type: GdgContentTypes.BLOG_POST,
  //     locale: this.settings.getLocale(),
  //     order: '-sys.createdAt',
  //     limit: howMany,
  //     include: 1
  //   });
  //   return from(promise).pipe(
  //     map((entries: EntryCollection<GdgBlogPost>) => {
  //       return entries.items;
  //     })
  //   );
  // }

  getHomeContent(
    howMany: number,
    sortAsc: boolean,
    onlyActive: boolean
  ): Observable<GdgHomeContent[]> {
    const query = {
      content_type: GdgContentTypes.HOME_CONTENT,
      locale: this.settings.getLocale(),
      limit: howMany,
      include: 1
    };
    const orderBy = sortAsc ? "fields.order" : "-fields.order";
    Object.assign(query, { order: orderBy });

    if (onlyActive) {
      Object.assign(query, { "fields.active": true });
    }

    return this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&${this.getContentfulUrlParameters(
          query
        )}`,
        { responseType: "json" }
      )
      .pipe(
        map((entries: EntryCollection<any>) => {
          const assets: Asset[] = entries.includes.Asset;
          return entries.items.map((item: Entry<any>) => {
            const img = this.getAssetById(assets, item.fields.image.sys.id);
            return new GdgHomeContent(
              item.fields.title,
              item.fields.order,
              item.fields.active,
              item.fields.content,
              item.fields.image
                ? new GdgImage(
                    img.fields.file.url,
                    img.fields.title,
                    img.fields.description
                  )
                : undefined
            );
          });
        }),
        catchError((error: any, caught: Observable<GdgHomeContent[]>) => {
          console.log("Błąd w home: ", error);
          return empty();
        })
      );

    // const promise: Promise<
    //   EntryCollection<GdgHomeContent[]>
    // > = this.clinet.getEntries(query).catch(error => {
    //   console.log('błąd pobrania danych');
    //   return null;
    // });
    // return from(promise).pipe(
    //   map((entries: EntryCollection<any>) => {
    //     return entries.items.map(item => {
    //       return new GdgHomeContent(
    //         item.fields.title,
    //         item.fields.order,
    //         item.fields.active,
    //         item.fields.content,
    //         item.fields.image
    //           ? new GdgImage(
    //               item.fields.image.fields.file.url,
    //               item.fields.image.fields.title,
    //               item.fields.image.fields.description
    //             )
    //           : undefined
    //       );
    //     });
    //   }),
    //   catchError((error: any, caught: Observable<GdgHomeContent[]>) => {
    //     return empty();
    //   })
    // );
  }

  private getAssetById(assetArray: Asset[], id: string): any {
    if (assetArray && assetArray.length > 0) {
      const newArray = assetArray.filter((item: Asset) => item.sys.id === id);
      if (newArray && newArray.length > 0) {
        return newArray[0];
      }
    }
    return {};
  }

  private getAssetsByIds(assetArray: Asset[], ids: Array<string>): any {
    if (assetArray && assetArray.length > 0 && ids && ids.length > 0) {
      const newArray = assetArray.filter((item: Asset) => {
        return ids.includes(item.sys.id);
      });
      return newArray;
    }
    return {};
  }

  private getEntryById(entriesArray: Entry<any>[], id: string): any {
    if (entriesArray && entriesArray.length > 0) {
      const newArray = entriesArray.filter(
        (item: Entry<any>) => item.sys.id === id
      );
      if (newArray && newArray.length > 0) {
        return newArray[0];
      }
    }
    return {};
  }

  private getEntriesByContentType(
    entriesArray: Entry<any>[],
    contentType: GdgContentTypes,
    locale?: string
  ): any {
    if (entriesArray && entriesArray.length > 0) {
      const newArray = entriesArray.filter((item: Entry<any>) => {
        if (locale) {
          return (
            item.sys.contentType.sys.id === contentType &&
            item.sys.locale.toLowerCase === locale.toLowerCase
          );
        } else {
          return item.sys.contentType.sys.id === contentType;
        }
      });
      if (newArray && newArray.length > 0) {
        return newArray;
      }
    }
    return {};
  }

  // getHomeContentFull(howMany: number): Observable<GdgHomeContent[]> {
  //   const promise: Promise<
  //     EntryCollection<GdgHomeContent[]>
  //   > = this.clinet.getEntries({
  //     content_type: GdgContentTypes.HOME_CONTENT,
  //     locale: this.settings.getLocale(),
  //     order: '-sys.createdAt',
  //     limit: howMany,
  //     include: 1
  //   });
  //   return from(promise).pipe(
  //     map((entries: EntryCollection<GdgHomeContent>) => {
  //       return entries.items;
  //     })
  //   );
  // }

  getBlogPostLink(link: string): Observable<GdgBlogPostLink> {
    const query = {
      content_type: GdgContentTypes.BLOG_POST_LINK,
      "fields.link": link,
      order: "-sys.createdAt",
      include: 1,
      limit: 1
    };

    return this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&${this.getContentfulUrlParameters(
          query
        )}`,
        { responseType: "json" }
      )
      .pipe(
        map((entries: EntryCollection<any>) => {
          if (entries && entries.items && entries.items[0]) {
            // console.log('getBlogPostLink().entry: ', entries.items[0]);
            return new GdgBlogPostLink(
              entries.items[0].fields.link,
              entries.items[0].fields.locale,
              entries.items[0].fields.blogPost.sys.id
            );
          } else {
            return null;
          }
        })
      );

    // const promise: Promise<
    //   EntryCollection<GdgBlogPostLink[]>
    // > = this.clinet.getEntries(query);
    // return from(promise).pipe(
    //   map((entries: EntryCollection<any>) => {
    //     if (entries && entries.items && entries.items[0]) {
    //       // console.log('getBlogPostLink().entry: ', entries.items[0]);
    //       return new GdgBlogPostLink(
    //         entries.items[0].fields.link,
    //         entries.items[0].fields.locale,
    //         entries.items[0].fields.blogPost.sys.id
    //       );
    //     } else {
    //       return null;
    //     }
    //   })
    // );
  }

  getBlogPostLinksByBlogPostId(
    blogPostId: string
  ): Observable<GdgBlogPostLink[]> {
    const query = {
      content_type: GdgContentTypes.BLOG_POST_LINK,
      "fields.blogPost.sys.id": blogPostId,
      order: "-sys.createdAt",
      include: 1
    };

    return this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&${this.getContentfulUrlParameters(
          query
        )}`,
        { responseType: "json" }
      )
      .pipe(
        map((entries: EntryCollection<any>) => {
          return entries.items.map(item => {
            return new GdgBlogPostLink(
              item.fields.link,
              item.fields.locale,
              item.fields.blogPost.sys.id
            );
          });
        })
      );
    // const promise: Promise<
    //   EntryCollection<GdgBlogPostLink[]>
    // > = this.clinet.getEntries(query);
    // return from(promise).pipe(
    //   map((entries: EntryCollection<any>) => {
    //     return entries.items.map(item => {
    //       return new GdgBlogPostLink(
    //         item.fields.link,
    //         item.fields.locale,
    //         item.fields.blogPost.sys.id
    //       );
    //     });
    //   })
    // );
  }

  // getBlogPostLinksFull(howMany: number): Observable<GdgBlogPostLink[]> {
  //   const promise: Promise<
  //     EntryCollection<GdgBlogPostLink[]>
  //   > = this.clinet.getEntries({
  //     content_type: GdgContentTypes.BLOG_POST_LINK,
  //     include: 0,
  //     // locale: this.settings.getLocale(),
  //     // order: '-sys.createdAt',
  //     limit: howMany
  //   });
  //   return from(promise).pipe(
  //     map((entries: EntryCollection<GdgBlogPostLink>) => {
  //       return entries.items;
  //     })
  //   );
  // }

  getBlogPost(id: string, locale: string): Observable<GdgBlogPost> {
    const query = {
      content_type: GdgContentTypes.BLOG_POST,
      locale: locale,
      "sys.id": id,
      include: 1,
      limit: 1
    };

    return this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&${this.getContentfulUrlParameters(
          query
        )}`,
        { responseType: "json" }
      )
      .pipe(
        map((entries: EntryCollection<any>) => {
          if (entries && entries.items && entries.items[0]) {
            // console.log("Entries", entries);
            const assets: Asset[] = entries.includes.Asset;
            const links: Entry<any>[] = entries.includes.Entry;
            let postPhotos = null;
            if (entries.items[0].fields.photos) {
              const photosIds: Array<
                string
              > = entries.items[0].fields.photos.map(item => item.sys.id);
              postPhotos = this.getAssetsByIds(assets, photosIds);
            }

            const author = this.getEntryById(
              links,
              entries.items[0].fields.author.sys.id
            );
            const authorPhoto = this.getAssetById(
              assets,
              author.fields.profilePhoto.sys.id
            );
            const photoSmall = this.getAssetById(
              assets,
              entries.items[0].fields.postPhotoSmall.sys.id
            );
            const postPhoto = this.getAssetById(
              assets,
              entries.items[0].fields.postPhoto.sys.id
            );
            const blogPostLinks = this.getEntriesByContentType(
              links,
              GdgContentTypes.BLOG_POST_LINK
            );

            // console.log("Post photos", postPhotos);

            return new GdgBlogPost(
              entries.items[0].sys.id,
              entries.items[0].fields.title,
              entries.items[0].fields.postDate,
              postPhoto.fields.file.url,
              photoSmall.fields.file.url,
              entries.items[0].fields.content,
              entries.items[0].fields.contentShort,
              new GdgTeamMember(
                author.fields.name,
                author.fields.tags,
                authorPhoto ? authorPhoto.fields.file.url : undefined,
                author.fields.linkedinUrl,
                author.fields.twitterUrl,
                author.fields.githubUrl
              ),
              entries.items[0].fields.keywords,
              blogPostLinks ? blogPostLinks : undefined,
              postPhotos ? postPhotos : undefined
            );
          }
        })
      );

    // const promise: Promise<
    //   EntryCollection<GdgBlogPost>
    // > = this.clinet.getEntries(query);

    // return from(promise).pipe(
    //   map((entries: EntryCollection<any>) => {
    //     if (entries && entries.items && entries.items[0]) {
    //       // console.log('getBlogPost.entry: ', entries.items[0]);
    //       return new GdgBlogPost(
    //         entries.items[0].sys.id,
    //         entries.items[0].fields.title,
    //         entries.items[0].fields.postDate,
    //         entries.items[0].fields.postPhoto.fields.file.url,
    //         entries.items[0].fields.postPhotoSmall.fields.file.url,
    //         entries.items[0].fields.content,
    //         entries.items[0].fields.contentShort,
    //         new GdgTeamMember(
    //           entries.items[0].fields.author.fields.name,
    //           entries.items[0].fields.author.fields.tags,
    //           entries.items[0].fields.author.fields.profilePhoto
    //             ? entries.items[0].fields.author.fields.profilePhoto.fields.file
    //                 .url
    //             : undefined,
    //           entries.items[0].fields.author.fields.linkedinUrl,
    //           entries.items[0].fields.author.fields.twitterUrl,
    //           entries.items[0].fields.author.fields.githubUrl
    //         ),
    //         entries.items[0].fields.keywords,
    //         entries.items[0].fields.links
    //           ? entries.items[0].fields.links
    //           : undefined,
    //         entries.items[0].fields.photos
    //           ? entries.items[0].fields.photos
    //           : undefined
    //       );
    //     }
    //   })
    // );
  }

  // getBlogPostFull(id: string): Observable<any> {
  //   const promise: Promise<Entry<GdgBlogPost>> = this.clinet.getEntry(id, {
  //     content_type: GdgContentTypes.BLOG_POST,
  //     locale: this.settings.getLocale(),
  //     include: 1
  //   });
  //   return from(promise).pipe(
  //     map((item: Entry<GdgBlogPost>) => {
  //       return item;
  //     })
  //   );
  // }

  getContactInfo(): Observable<GdgContactInfo> {
    const query = {
      content_type: GdgContentTypes.CONTACT_INFO,
      locale: this.settings.getLocale(),
      order: "-sys.createdAt",
      "fields.active": true,
      limit: 1
    };

    return this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&${this.getContentfulUrlParameters(
          query
        )}`,
        { responseType: "json" }
      )
      .pipe(
        map((entries: EntryCollection<any>) => {
          if (entries && entries.items && entries.items[0]) {
            return new GdgContactInfo(
              entries.items[0].fields.name,
              entries.items[0].fields.email,
              entries.items[0].fields.active,
              entries.items[0].fields.phone,
              entries.items[0].fields.siteUrl,
              entries.items[0].fields.meetupUrl
                ? entries.items[0].fields.meetupUrl
                : undefined,
              entries.items[0].fields.facebookUrl
                ? entries.items[0].fields.facebookUrl
                : undefined,
              entries.items[0].fields.twitterUrl
                ? entries.items[0].fields.twitterUrl
                : undefined,
              entries.items[0].fields.youtubeUrl
                ? entries.items[0].fields.youtubeUrl
                : undefined,
              entries.items[0].fields.githubUrl
                ? entries.items[0].fields.githubUrl
                : undefined
            );
          } else {
            return null;
          }
        })
      );

    // const promise: Promise<
    //   EntryCollection<GdgContactInfo[]>
    // > = this.clinet.getEntries(query);
    // return from(promise).pipe(
    //   map((entries: EntryCollection<any>) => {
    //     if (entries && entries.items && entries.items[0]) {
    //       return new GdgContactInfo(
    //         entries.items[0].fields.name,
    //         entries.items[0].fields.email,
    //         entries.items[0].fields.active,
    //         entries.items[0].fields.phone,
    //         entries.items[0].fields.siteUrl,
    //         entries.items[0].fields.meetupUrl
    //           ? entries.items[0].fields.meetupUrl
    //           : undefined,
    //         entries.items[0].fields.facebookUrl
    //           ? entries.items[0].fields.facebookUrl
    //           : undefined,
    //         entries.items[0].fields.twitterUrl
    //           ? entries.items[0].fields.twitterUrl
    //           : undefined,
    //         entries.items[0].fields.youtubeUrl
    //           ? entries.items[0].fields.youtubeUrl
    //           : undefined,
    //         entries.items[0].fields.githubUrl
    //           ? entries.items[0].fields.githubUrl
    //           : undefined
    //       );
    //     } else {
    //       return null;
    //     }
    //   })
    // );
  }

  // getEventsFull(howMany: number): Observable<GdgEvent[]> {
  //   const promise: Promise<
  //     EntryCollection<GdgEvent[]>
  //   > = this.clinet.getEntries({
  //     content_type: GdgContentTypes.EVENT,
  //     locale: this.settings.getLocale(),
  //     order: '-sys.createdAt',
  //     limit: howMany
  //   });
  //   return from(promise).pipe(
  //     map((entries: EntryCollection<GdgEvent>) => {
  //       return entries.items;
  //     })
  //   );
  // }

  getTeamMembers(howMany: number): Observable<GdgTeamMember[]> {
    const query = {
      content_type: GdgContentTypes.TEAM_MEMBER,
      locale: this.settings.getLocale(),
      order: "sys.createdAt",
      limit: howMany
    };
    return this.http
      .get(
        `${this.CONTENTFUL_URL_ENTRIES}&${this.getContentfulUrlParameters(
          query
        )}`,
        { responseType: "json" }
      )
      .pipe(
        map((entries: EntryCollection<any>) => {
          const assets: Asset[] = entries.includes.Asset;
          return entries.items.map(item => {
            const profilePhoto = this.getAssetById(
              assets,
              item.fields.profilePhoto.sys.id
            );
            return new GdgTeamMember(
              item.fields.name,
              item.fields.tags,
              profilePhoto ? profilePhoto.fields.file.url : undefined,
              item.fields.linkedinUrl,
              item.fields.twitterUrl,
              item.fields.githubUrl
            );
          });
        })
      );
  }

  // getTeamMembersFull(howMany: number): Observable<GdgTeamMember[]> {
  //   const promise: Promise<
  //     EntryCollection<GdgTeamMember[]>
  //   > = this.clinet.getEntries({
  //     content_type: GdgContentTypes.TEAM_MEMBER,
  //     locale: this.settings.getLocale(),
  //     order: 'sys.createdAt',
  //     limit: howMany
  //   });
  //   return from(promise).pipe(
  //     map((entries: EntryCollection<GdgTeamMember>) => {
  //       return entries.items;
  //     })
  //   );
  // }

  markdownToHtml(md: string) {
    return marked(md);
  }
}
