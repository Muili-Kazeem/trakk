import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DateTime } from 'luxon';
import { gsap } from 'gsap';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { HandlemapService } from './handlemap.service';
import { StateService } from '../../data-access/state.service';
import { MessageService } from 'primeng/api';
import { Timer } from '../../utils/funcs/timer';
import { PositionTracker } from '../../utils/funcs/PositionTracker';
import { iconSelect } from '../../utils/funcs/iconSelect';
import { IActivity } from '../../utils/models/iactivity';

@Component({
  selector: 'app-activity-on',
  templateUrl: './activity-on.component.html',
  styleUrls: ['./activity-on.component.scss'],
  providers: [MessageService]
})
export class ActivityOnComponent implements OnInit, OnDestroy, AfterViewInit {

  icon(category: string) {
    return iconSelect(category)
  }

  @ViewChild("map") private mapRef!: ElementRef;
  @ViewChild("animatedIcon") private animatedIcon!: ElementRef;
  @ViewChild("metricPane") private metricPane!: ElementRef;

  started: boolean = false;
  ongoing: boolean = false;
  paused: boolean = false;
  animationObj!: any;
  sub!: Subscription;
  displayMetricsPane: boolean = true;
  activityCategory!: string;
  activityId!: string;

  timer = new Timer();
  tracker = new PositionTracker();

  constructor(
    private activitiesService: ActivitiesDataService,
    private router: Router,
    private route: ActivatedRoute,
    private state: StateService,
    private messageService: MessageService,
    private map: HandlemapService ) {}

  ngOnInit(): void {
    this.activityCategory = this.route.snapshot.paramMap.get("activity") as string;
    this.activityId = this.route.snapshot.paramMap.get("id") as string;
    this.state.emitPageTitle(this.route.snapshot?.data["pageTitle"]);
    this.scrollToMap();
  }

  ngAfterViewInit(): void {
    this.map.buildMap()
    this.messageService.add({ key: 'gps', detail: "Please turn on your Location. Acquiring GPS...", closable: false, life: 5000 })
  }

  startAnimation() {
    this.animationObj = gsap.to(
      this.animatedIcon.nativeElement,
      { scale: 1.5, duration: 0.1, yoyo: true, repeat: -1 }
    );
  }

  // Toggle metrics pane visibility
  toggleMetricsPane() {
    this.displayMetricsPane = !this.displayMetricsPane;
  }

  scrollToMap() {
    this.mapRef.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  start() {
    this.started = true;
    this.ongoing = true;
    this.paused = false;
    this.timer.startTiming();
    this.tracker.startTracking();
    this.map.startTrackingActivityPoints();
    if(!this.animationObj) { this.startAnimation() } else { this.animationObj.resume() };
    this.metricPane.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  pause() {
    this.timer.pauseTiming();
    this.paused = true;
    this.animationObj.pause();
    // create a pauseTracking in the Positiontracker class
  }

  finish() {
    this.started = false;
    this.ongoing = false;
    this.paused = false;
    if (this.animationObj) {
      this.animationObj.kill();
    }
  }

  post() {
    if (this.tracker.getDistance() <= 0.1 || this.tracker.getDistance() === undefined) {
      this.timer.pauseTiming();
      this.tracker.stopTracking();
      this.messageService.add({ key:'distance', detail:"Trakk needs more data to work with.", summary:"You only covered little distance.", closable:false, life:4000 })
    } else {
      this.timer.pauseTiming();
      this.tracker.stopTracking();
      this.finish();

      let activityData: IActivity = {
        duration: this.timer.getTime(),
        category: this.activityCategory,
        date: DateTime.local().toUTC().toISO(),
        navigatingCoords: JSON.stringify(this.tracker.getGeoJSON()),
        distance: this.tracker.getDistance(),
        starting: {
          coords: this.tracker.getStartingPosition() ? [0,0] : this.tracker.getStartingPosition(),
          timeStamp: DateTime.local().toUTC().toISO(),
        },
        stopping: {
          coords: this.tracker.getStoppingPosition() ? [0,0] : this.tracker.getStoppingPosition(),
          timeStamp: DateTime.local().toUTC().toISO(),
        },
      }

      this.sub = this.activitiesService.emitActivityData(activityData)
        .subscribe(
          all => { this.router.navigate(["activities", this.activityCategory, all.id]) },
          err => confirm(`E never go through but na frebase. E go later go through. Err: ${err.message} `)
        )
    }
  }

  ngOnDestroy(): void {
    if (this.map.map) {
      this.map.unsubscribe()
    }
  }
}
