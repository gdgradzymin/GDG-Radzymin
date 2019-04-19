import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  OnDestroy,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { timer, Subscription, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input()
  eventDate: number;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;
  milisecLeft: number;

  @Output()
  zeroTrigger = new EventEmitter(false);

  destroySubject$: Subject<void> = new Subject();



  // https://github.com/markpenaranda/ngx-countdown-timer/blob/master/src/countdown-timer.component.ts

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    timer(1000, 1000).pipe(
      takeUntil(this.destroySubject$)
    )
    .subscribe((t: any) => {
      this.milisecLeft = this.getTimeDiff(this.eventDate);
      this.calculateDiff(this.milisecLeft);
      this.ref.markForCheck();
    });
  }

  private getTimeDiff(eventTime: number): number {
    // returns time difference in miliseconds
    if (isNaN(eventTime)) {
      this.zeroTrigger.emit(true);
      return 0;
    }
    const end = new Date(eventTime).getTime();
    const now = new Date().getTime();
    if (end - now <= 0) {
      this.zeroTrigger.emit(true);
      return 0;
    }
    return end - now;
  }

  calculateDiff(milisecDiff: number): void {

    this.secondsLeft = Math.floor(milisecDiff / 1000);
    this.minutesLeft = Math.floor(this.secondsLeft / 60);
    this.hoursLeft = Math.floor(this.minutesLeft / 60);
    this.daysLeft = Math.floor(this.hoursLeft / 24);

    this.hoursLeft %= 24;
    this.minutesLeft %= 60;
    this.secondsLeft %= 60;
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}
