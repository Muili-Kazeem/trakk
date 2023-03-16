import { Component, OnInit } from '@angular/core';
import { faBolt, faClock, faRoad, faRunning, faWind } from '@fortawesome/free-solid-svg-icons';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { MapService } from '../../data-access/map.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {

  faRun = faRunning;
  faStart = faBolt;
  faClock = faClock;
  faSpeed = faWind;
  faRoad = faRoad;
  activityId!: string;
  activityCategory!: string;

  constructor( private activities: ActivitiesDataService,
               private map: MapService,
               private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.activityCategory = <string>params.get("activity")
        this.activityId = <string>params.get("id")
        console.log(this.activityCategory, this.activityId)
        // this.categoryActivities$ = this.activitiesService.getCategoryData(this.activityCategory).pipe(
        //   map( categoryActivities => categoryActivities.sort((a, b) => recentSorting(a, b)) )
        // )
      }
    )
    this.map.buildMap();
  }

  applyGeo() {
    console.log("I'm working")
    this.map.geo();
  }



}
