import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, combineLatest, map, of, startWith, tap } from 'rxjs';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { StateService } from '../../data-access/state.service';
import { IActivity, ICategorizedActivity } from '../../utils/models/iactivity';
import { IRequestState } from '../../utils/models/iRequestState';
import { recentSorting } from "../../utils/funcs/recentSorting";

@Component({
  selector: 'app-activities-home',
  templateUrl: './activities-home.component.html',
  styleUrls: ['./activities-home.component.scss']
})
export class ActivitiesHomeComponent implements OnInit {
  constructor(private activitiesService: ActivitiesDataService, private state: StateService, private route: ActivatedRoute) {};
  ngOnInit(): void { this.state.emitPageTitle(this.route.snapshot.data["pageTitle"]) }

  errorMessage!: any;

  // Fetch all activities using the Data Service
  allCategorizedActivities$: Observable<IRequestState<ICategorizedActivity[]>> = this.activitiesService.allCategorizedActivities$.pipe(
    map((value) => ({isLoading: false, value})),
    catchError(err => {
      // this.errorMessage = err;
      return of({isLoading: false, err})
    }),
    startWith({isLoading: true})
  );

  allActivities$ = this.allCategorizedActivities$.pipe(
    map(({value}) => {
      return value?.reduce((acc, category) => {
        acc.push(category.activities)
        return acc;
      }, [] as IActivity[][])
    })
  );

  allActivitiesCategories$ = this.allCategorizedActivities$.pipe(
    map(({value}) => {
      return value?.reduce((acc, category) => {
        acc.push(category.category)
        return acc;
      }, [] as string[])
    })
  );

  allReducedActivities$ = combineLatest([this.allActivitiesCategories$, this.allActivities$]).pipe(
    map(([categories, activities]) => {
      return activities?.reduce((acc: {category: string, distance: number, duration: number, length: number}[], activity, i, activities) => {
        let distance = activities[i].reduce((acc, activity) => {
          acc += activity.distance
          return acc;
        }, 0 as number);
        let duration = activities[i].reduce((acc, activity) => {
          acc += activity.duration
          return acc;
        }, 0 as number);
        let length = activity.length
        acc.push({ category: categories![i], distance, duration, length })
        return acc;
      }, [] as {category: string, distance: number, duration: number, length: number}[])
    }),
    tap(all => console.log(all))
  )

  allRecentActivities$ = this.allActivities$.pipe(
    map( allActivitiesArrays => allActivitiesArrays?.flatMap(activitiesArray => activitiesArray)),
    map( allFlattenedActivities => allFlattenedActivities?.sort((a, b) => recentSorting(a, b) )),
    map(allRecentActivities => {
      let length = allRecentActivities?.length;
      return allRecentActivities?.slice(0, length! > 3 ? 3 : allRecentActivities?.length)
    })
  )

}
