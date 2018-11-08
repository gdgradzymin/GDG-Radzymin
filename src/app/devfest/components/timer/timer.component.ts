import {
  Component,
  EventEmitter,
  OnInit,
  Input,
  OnDestroy,
  Output
} from "@angular/core";
import { timer, Subscription } from "rxjs";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"]
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

  private timerSubscription: Subscription;

  // https://github.com/markpenaranda/ngx-countdown-timer/blob/master/src/countdown-timer.component.ts

  constructor() {}

  ngOnInit() {
    this.timerSubscription = timer(2000, 1000).subscribe((t: any) => {
      this.milisecLeft = this.getTimeDiff(this.eventDate);
      this.daysLeft = this.getDaysDiff(this.milisecLeft);
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

  private getDaysDiff(milisecDiff: number): number {
    return Math.floor(milisecDiff / 1000 / 60 / (60 * 24));
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
