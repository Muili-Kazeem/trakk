import { Component, OnDestroy, OnInit } from '@angular/core';
import { faBars, faBolt, faClockRotateLeft, faLocationDot, faRoad, faRunning } from '@fortawesome/free-solid-svg-icons';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActiveActivityMapComponent } from '../../ui/active-activity-map/active-activity-map.component';
import { Timer } from '../../utils/funcs/timer';
import { PositionTracker } from '../../utils/funcs/PositionTracker';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../data-access/state.service';
import { IActivity } from '../../utils/models/iactivity';
import { DateTime } from 'luxon';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-activity-on',
  templateUrl: './activity-on.component.html',
  styleUrls: ['./activity-on.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class ActivityOnComponent implements OnInit, OnDestroy {
  faMenu = faBars;
  faRun = faRunning;
  faRoad = faRoad;
  faTime = faClockRotateLeft;
  faMap = faLocationDot;
  faSpeed = faBolt;

  started: boolean = false;
  ongoing: boolean = false;
  paused: boolean = false;

  ref!: DynamicDialogRef;
  displayMetricsPane: boolean = true;
  activityCategory!: string;
  activityId!: string;

  timer = new Timer();
  tracker = new PositionTracker();
  watchId = this.tracker.getWatchId();

  constructor(
    private dialogService: DialogService,
    private activitiesService: ActivitiesDataService,
    private router: Router,
    private route: ActivatedRoute,
    private state: StateService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.activityCategory = this.route.snapshot.paramMap.get("activity") as string;
    this.activityId = this.route.snapshot.paramMap.get("id") as string;
    this.state.emitPageTitle(this.route.snapshot?.data["pageTitle"]);
  }

  toggleMetricsPane() {
    this.displayMetricsPane = !this.displayMetricsPane;
  }

  // DISPLAY MAP POP-UP IN MOBILE
  showMap() {
    this.ref = this.dialogService.open(ActiveActivityMapComponent, {
        width: '80%',
        height: '100%',
        contentStyle: {"overflow": "auto"},
        baseZIndex: 10000,
        maximizable: true
    });
  }

  leave() {
    this.router.navigate(["/activities/stat"]);
  }

  start() {
    this.timer.startTiming();
    this.tracker.startTracking();
    this.started = true;
    this.ongoing = true;
    this.paused = false;
  }

  pause() {
    this.timer.pauseTiming();
    this.paused = true;
    // create a pauseTracking in the Positiontracker class
  }

  finish() {
    this.started = false;
    this.ongoing = false;
    this.paused = false;
  }

  post() {
    if (!(this.tracker.getDistance() <= 0.1 || this.tracker.getDistance() === undefined)) {
      this.timer.pauseTiming()
      this.tracker.stopTracking()
      // this.messageService.add({key: 'gps', sticky: true, detail:'You have not covered any distance'});
    } else {
      this.timer.pauseTiming()
      this.tracker.stopTracking()
      this.finish()

      let activityData: IActivity = {
        activityId: this.activityId,
        duration: this.timer.getTime(),
        category: this.activityCategory,
        date: DateTime.local().toUTC().toISO(),
        navigatingCoords: this.tracker.getGeoJSON(),
        distance: this.tracker.getDistance(),
        starting: {
          coords: this.tracker.getStartingPosition(),
          timeStamp: DateTime.local().toUTC().toISO()
        },
        stopping: {
          coords: this.tracker.getStoppingPosition(),
          timeStamp: DateTime.local().toUTC().toISO()
        },
      }

      console.log(activityData)
      this.activitiesService.emitActivityData(activityData)
    }
    // this.router.navigate(["activities", this.activityCategory, this.activityId])
  }





  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
