import { Injectable } from '@angular/core';
import { IActivity, ICategorizedActivity } from '../utils/models/iactivity';
import { Observable, map, of, tap } from 'rxjs';
import { ACTIVITIES } from './activities';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesDataService {

  constructor() {
  }

  getAllCategorizedActivities(): Observable<ICategorizedActivity[]> {
    return of(ACTIVITIES).pipe(
      map((allActivities: IActivity[]) => {
          return Object.values(allActivities.reduce((acc, activity) => {
        if (acc[<any>activity.category]) {
          acc[<any>activity.category].activities.push(activity)
        } else {
          acc[<any>activity.category] = { category: activity.category, activities: [activity] }
        }
        return acc
      }, [] as ICategorizedActivity[]))
    })
    )
  }

  getCategoryData(activityCategory: string): Observable<IActivity[]> {
    return this.getAllCategorizedActivities().pipe(
      map(allCategorizedActivities => {
        return allCategorizedActivities.find(categorizedActivity => {
          return categorizedActivity.category == activityCategory;
        })?.activities as IActivity[]
      })
    )
  }

  getActivityData(activityCategory:string, id: number): Observable<IActivity> {
    return this.getCategoryData(activityCategory).pipe(
      map(categoryActivities => categoryActivities.find(activity => activity.activityId === id) as IActivity)
    )
  }

}
