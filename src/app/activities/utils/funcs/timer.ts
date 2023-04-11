import { Observable, Subject, interval, takeUntil, timer } from "rxjs";
import { DateTime, Duration } from 'luxon';

export class Timer {
  private time$!: Observable<number>;
  private destroy$: Subject<void> = new Subject<void>();
  private startTime!: any;
  private pauseDuration: number = 0;
  private milliseconds: number = 0;

  constructor() {}

  public startTiming() {
    if(!this.startTime) {
      this.startTime = DateTime.now();
    } else {
      const now = DateTime.now()
      this.startTime = now.minus(this.pauseDuration)
      this.pauseDuration = 0;
    }

    this.time$ = timer(0, 1000).pipe(
      takeUntil(this.destroy$)
    );

    this.time$.subscribe(() => {
      const now = DateTime.now();
      const diff = now.diff(this.startTime, "milliseconds");
      this.milliseconds = diff.toMillis();
    });
  }

  public pauseTiming() {
    const now = DateTime.now();
    const diff = now.diff(this.startTime, 'milliseconds')
    this.pauseDuration = diff.toMillis();
    this.destroy$.next();
  }

  public restartTiming() {
    this.destroy$.next();
    this.milliseconds = 0;
    this.startTime = null;
    this.pauseDuration = 0;
  }

  public getTime() {
    return this.milliseconds;
  }

  public getTimeFormatted() {
    const duration = Duration.fromMillis(this.milliseconds);
    return duration.toFormat("hh:mm:ss");
  }

}
