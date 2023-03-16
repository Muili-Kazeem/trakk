import { Component, OnInit } from '@angular/core';
import { faBolt, faClock, faRoad, faRunning, faWind } from '@fortawesome/free-solid-svg-icons';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { IActivity, ICategorizedActivity } from '../../utils/models/iactivity';
import { Observable, combineLatest, map } from 'rxjs';
import { DateTime } from 'luxon';
import { recentSorting } from "../../utils/funcs/recentSorting"

@Component({
  selector: 'app-activities-home',
  templateUrl: './activities-home.component.html',
  styleUrls: ['./activities-home.component.scss']
})
export class ActivitiesHomeComponent implements OnInit {

  faRun = faRunning;
  faStart = faBolt;
  faClock = faClock;
  faSpeed = faWind;
  faRoad = faRoad;

  allCategorizedActivities$!: Observable<ICategorizedActivity[]>;
  allActivities$!: Observable<IActivity[][]>;
  allActivitiesCategories$!: Observable<string[]>;
  allReducedActivities$!: Observable<{category: string, distance: number, duration: number, length: number}[]>;
  allRecentActivities$!: Observable<IActivity[]>;

  constructor(private activitiesService: ActivitiesDataService) { }

  ngOnInit(): void {
    this.allCategorizedActivities$ = this.activitiesService.getAllCategorizedActivities();

    this.allActivities$ = this.allCategorizedActivities$.pipe(
      map(activities => {
        return activities.reduce((acc, category) => {
          acc.push(category.activities)
          return acc;
        }, [] as IActivity[][])
      }),
      // tap(all => console.log(all))
    );

    this.allActivitiesCategories$ = this.allCategorizedActivities$.pipe(
      map(activities => {
        return activities.reduce((acc, category) => {
          acc.push(category.category)
          return acc;
        }, [] as string[])
      }),
      // tap(all => console.log(all))
    );

    this.allReducedActivities$ = combineLatest([this.allActivitiesCategories$, this.allActivities$])
      .pipe(
        map(([categories, activities]) => {
          return activities.reduce((acc: {category: string, distance: number, duration: number, length: number}[], activity, i, activities) => {
            let distance = activities[i].reduce((acc, activity) => {
              acc += activity.distance
              return acc;
            }, 0 as number);
            let duration = activities[i].reduce((acc, activity) => {
              acc += activity.duration
              return acc;
            }, 0 as number);
            let length = activity.length
            acc.push({ category: categories[i], distance, duration, length })
            return acc;
          }, [] as {category: string, distance: number, duration: number, length: number}[])
        }),
        // tap(all => console.log(all))
      )

    this.allRecentActivities$ = this.allActivities$
      .pipe(
        map( allActivitiesArrays => allActivitiesArrays.flatMap(activitiesArray => activitiesArray)),
        map( allFlattenedActivities => allFlattenedActivities.sort((a, b) => recentSorting(a, b) )),
        map(allRecentActivities => {
          let length = allRecentActivities.length > 3 ? 3 : allRecentActivities.length
          return allRecentActivities.slice(0, length)
        })
      )
  }

}
