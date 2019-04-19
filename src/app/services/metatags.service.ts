import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

export enum MetaTags {
  DESCRIPTION = "description",
  KEYWORDS = "keywords"
}

@Injectable({
  providedIn: "root"
})
export class MetatagsService {
  constructor(private meta: Meta, private title: Title) {}

  updateMetaDesc(description: string): void {
    this.meta.updateTag({
      name: MetaTags.DESCRIPTION,
      content: description
    });
  }

  updateMetaKeywords(keywords: string): void {
    this.meta.updateTag({
      name: MetaTags.KEYWORDS,
      content: keywords
    });
  }

  updateTitle(title: string): void {
    this.title.setTitle(title);
  }
}
