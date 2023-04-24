import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of, startWith, switchMap, tap } from 'rxjs';

import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { StateService } from '../../data-access/state.service';
import { IActivity } from '../../utils/models/iactivity';
import { recentSorting } from '../../utils/funcs/recentSorting';
import { IRequestState } from '../../utils/models/iRequestState';
import { iconSelect } from '../../utils/funcs/iconSelect';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.component.html',
  styleUrls: ['./activity-overview.component.scss']
})
export class ActivityOverviewComponent implements OnInit {
  constructor( private activitiesService: ActivitiesDataService, private route: ActivatedRoute, private state: StateService ) {};
  ngOnInit(): void { this.state.emitPageTitle(this.route.snapshot?.data["pageTitle"]) }

  icon(category: string) { return iconSelect(category) };

  activityCategory!: string;

  categoryActivities$: Observable<IRequestState<IActivity[]>> = this.route.paramMap.pipe(
    switchMap(route => {
      this.activityCategory = route.get("activity")!;
      return this.activitiesService.getCategoryData(this.activityCategory).pipe(
        map( categoryActivities => categoryActivities.sort((a, b) => recentSorting(a, b)) )
      )
    }),
    map((value) => ({isLoading: false, value})),
    catchError(err => {
      // this.errorMessage = err;
      return of({isLoading: false, err})
    }),
    startWith({isLoading: true})
  );

  categoryTotalDuration$: Observable<number | undefined> = this.categoryActivities$.pipe(
    map(({value: categoryActivities}) => {
      return categoryActivities?.reduce((acc, activity) => {
        acc += activity.duration
        return acc;
      }, 0 as number)
    }),
    tap((all) => console.log(all))
  );

  categoryTotalDistance$: Observable<number | undefined> = this.categoryActivities$.pipe(
    map(({value: categoryActivities}) => {
      return categoryActivities?.reduce((acc, activity) => {
        acc += activity.distance
        return acc;
      }, 0 as number)
    }),
    tap(all => console.log(all))
  );

  topActivities$: Observable<IActivity[] | undefined > = this.categoryActivities$.pipe(
    map(({value: categoryActivities}) => {
      return categoryActivities?.sort((a: IActivity, b: IActivity): number => {
        const distA = a.distance;
        const distB = b.distance;
        if (distA > distB) { return -1 }
        if (distA < distB) { return 1 }
        return 0;
      })
    }),
    map(allTopActivities => {
      let length = allTopActivities?.length;
      return allTopActivities?.slice(0, length! > 5 ? 5 : allTopActivities?.length)
    }),
    tap((all) => console.log(all))
  );

}
