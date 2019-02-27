import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { GdgBlogPost } from "../../../models/gdg-blog-post.model";
import { faCalendarAlt } from "@fortawesome/fontawesome-free-regular";

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent implements OnInit {
  // @HostBinding('@routeFadeState') routeAnimation = true;

  @Input() blogPost: GdgBlogPost;

  @Input() locale: string;

  faCalendarAlt = faCalendarAlt;

  constructor() {}

  ngOnInit() {
    console.log("Locale: " + this.locale);
    console.log("Blog post: ");
    console.dir(this.blogPost);
  }

  czytaj() {
    console.log("czytaj!");
  }
}
