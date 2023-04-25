import { Component } from '@angular/core';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { Observable, map } from 'rxjs';
import { IActivity } from '../../utils/models/iactivity';
import { IStatProp } from '../../utils/models/iStatProp';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent {
  constructor(
    private activitiesDataService: ActivitiesDataService
  ) {}

  allActivities$ = this.activitiesDataService.allCategorizedActivities$.pipe(
    map((value) => {
      return value.reduce((acc, category) => {
        acc.push(...category.activities)
        return acc;
      }, [] as IActivity[])
    })
  )

  totalActivities$: Observable<number> = this.allActivities$.pipe(
    map(allActivities => allActivities.length)
  )

  totalTime$: Observable<number> = this.allActivities$.pipe(
    map(allActivities => allActivities.reduce((acc, activity) => {
      acc += activity.duration
      return acc;
    }, 0 as number))
  )

  totalDistance$: Observable<number> = this.allActivities$.pipe(
    map(allActivities => allActivities.reduce((acc, activity) => {
      acc += activity.distance
      return acc;
    }, 0 as number))
  )

  longestDistance$: Observable<number> = this.allActivities$.pipe(
    map(allActivities => allActivities.sort((a: IActivity, b: IActivity): number => {
      const distA = a.distance;
      const distB = b.distance;
      if (distA > distB) { return -1 }
      if (distA < distB) { return 1 }
      return 0;
    })),
    map(activities => activities[0].distance )
  )

  longestTime$: Observable<number> = this.allActivities$.pipe(
    map(allActivities => allActivities.sort((a: IActivity, b: IActivity): number => {
      const distA = a.duration;
      const distB = b.duration;
      if (distA > distB) { return -1 }
      if (distA < distB) { return 1 }
      return 0;
    })),
    map(activities => activities[0].duration )
  )

  statsArray: IStatProp[] = [
    {
      header: "Total time",
      subheader: "Aggregate time of all activities spent with Trakk.",
      value: this.totalTime$,
      format: "time"
    },
    {
      header: "Total distance",
      subheader: "Aggregate distance of all activities covered on the road alongside Trakk.",
      value: this.totalDistance$,
      format: "distance"
    },
    {
      header: "All activities",
      subheader: "All activities by the number.",
      value: this.totalActivities$,
    },
    {
      header: "Longest run (Distance)",
      subheader: "The longest distance covered at a stretch on the road showing that you are worth it.",
      value: this.longestDistance$,
      format: "distance"
    },
    {
      header: "Longest run (Duration)",
      subheader: "The longest time spent on the road improving yourself.",
      value: this.longestTime$,
      format: "time"
    },
  ]
}
