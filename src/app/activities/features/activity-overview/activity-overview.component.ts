import { Component, OnInit } from '@angular/core';
import { faBolt, faClock, faRoad, faRunning, faWind } from '@fortawesome/free-solid-svg-icons';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { IActivity } from '../../utils/models/iactivity';
import { recentSorting } from '../../utils/funcs/recentSorting';
import { StateService } from '../../data-access/state.service';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.component.html',
  styleUrls: ['./activity-overview.component.scss']
})
export class ActivityOverviewComponent implements OnInit {

  faRun = faRunning;
  faStart = faBolt;
  faClock = faClock;
  faSpeed = faWind;
  faRoad = faRoad;
  activityCategory!: string;
  categoryActivities$!: Observable<IActivity[]>;
  categoryTotalDuration$!: Observable<number>;
  categoryTotalDistance$!: Observable<number>;

  constructor( private activitiesService: ActivitiesDataService, private route: ActivatedRoute, private state: StateService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.activityCategory = <string>params.get("activity")
        console.log(this.activityCategory)
        this.categoryActivities$ = this.activitiesService.getCategoryData(this.activityCategory).pipe(
          map( categoryActivities => categoryActivities.sort((a, b) => recentSorting(a, b)) )
        )
      }
    )

    this.state.emitPageTitle(this.route.snapshot?.data["pageTitle"])

    this.categoryTotalDistance$ = this.categoryActivities$.pipe(
      map(categoryActivities => {
        return categoryActivities.reduce((acc, activity) => {
          acc += activity.distance
          return acc;
        }, 0 as number)
      }),
      tap(all => console.log(all))
    );

    this.categoryTotalDuration$ = this.categoryActivities$.pipe(
      map(categoryActivities => {
        return categoryActivities.reduce((acc, activity) => {
          acc += activity.duration
          return acc;
        }, 0 as number)
      }),
      tap((all) => console.log(all))
    )

  }


}
