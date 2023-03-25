import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faBolt, faClock, faRoad, faRunning, faWind } from '@fortawesome/free-solid-svg-icons';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { MapService } from '../../data-access/map.service';
import { ActivatedRoute } from '@angular/router';
import { IActivity } from '../../utils/models/iactivity';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit, AfterViewInit {

  faRun = faRunning;
  faStart = faBolt;
  faClock = faClock;
  faSpeed = faWind;
  faRoad = faRoad;

  activityId!: number;
  activityCategory!: string;
  activity$!: Observable<IActivity>;

  constructor( private activitiesService: ActivitiesDataService,
               private map: MapService,
               private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.activityCategory = <string>params.get("activity")
        this.activityId = +(params.get("id")!)
        console.log(this.activityCategory, this.activityId)
        this.activity$ = this.activitiesService.getActivityData(this.activityCategory, this.activityId).pipe(
          tap( hi => {console.log(hi)}))
      }
    )
  }

  ngAfterViewInit(): void {
    this.map.buildMap()
  }

  applyGeo() {
    console.log("I'm working");
    this.map.lineAnimate();
  }

}
