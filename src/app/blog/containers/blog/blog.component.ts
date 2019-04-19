import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { GdgBlogPost } from '../../../models/gdg-blog-post.model';
import { Observable, Subject } from 'rxjs';
import {
  SettingsService,
  Lang,
  Metatags
} from '../../../services/settings.service';
import {
  trigger,
  transition,
  style,
  query,
  stagger,
  animate
} from '@angular/animations';
import { MetatagsService } from '../../../services/metatags.service';
import { takeUntil, switchMap, skip } from 'rxjs/operators';
import { StateService } from '../../../services/state.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':enter',
          stagger('300ms', [
            animate('800ms 300ms ease-out', style({ opacity: 1 }))
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts$: Observable<GdgBlogPost[]>;
  destroySubject$: Subject<void> = new Subject();
  locale: string;

  constructor(
    private state: StateService,
    private settings: SettingsService,
    private meta: MetatagsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((data: Data) => {
        this.meta.updateMetaDesc(data.metatags.desc);
        this.meta.updateTitle(data.metatags.title);
        this.meta.updateMetaKeywords(data.metatags.keywords);
      });

    this.settings
      .getCurrentLang()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((lang: Lang) => {
        this.locale = lang.locale;
      });

    this.settings
      .getCurrentLang()
      .pipe(
        takeUntil(this.destroySubject$),
        skip(1),
        switchMap((lang: Lang) => {
          return this.settings.getMetatags('blog');
        })
      )
      .subscribe((metatags: Metatags) => {
        this.meta.updateMetaDesc(metatags.desc);
        this.meta.updateTitle(metatags.title);
        this.meta.updateMetaKeywords(metatags.keywords);
      });
    this.blogPosts$ = this.state.getBlogPosts();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }
}
