import { Injectable } from '@angular/core';
import { IActivity, ICategorizedActivity } from '../utils/models/iactivity';
import { Observable, BehaviorSubject, catchError, map, of, throwError, withLatestFrom, Subject, take, filter, tap } from 'rxjs';
import { ACTIVITIES } from './activities';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Firestore, collectionData, collectionSnapshots } from '@angular/fire/firestore';
import { DocumentSnapshot, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesDataService {
  constructor(private fireStore: Firestore) {}

  private activityFormDataSubject = new BehaviorSubject<{}>({})
  activityFormData$ = this.activityFormDataSubject.asObservable()

  private activityDataSubject = new BehaviorSubject<{}>({})
  activityData$ = this.activityDataSubject.asObservable()

  emitActivityFormData(activity: IActivity) {
    this.activityFormDataSubject.next(activity)
  }

  emitActivityData(activityData: {}) {
    this.activityDataSubject.next(activityData)

    this.activityData$.pipe(take(1))
      .pipe(
        withLatestFrom(this.activityFormData$.pipe(filter(value => Object.keys(value).length !== 0), take(1))),
        map(([activityData, formData]) => ({ ...activityData, ...formData }))
        )
      .subscribe((Data) => {console.log(Data)})
  }

  // allCategorizedActivities = collectionSnapshots(collection(this.fireStore, "activities/XdaIPimnm4KxzFhS5zuT/activities")).pipe(
  //   map(
  //     all => all.map(all => {
  //       const data = all.data();
  //       const id = all.id;
  //       return { ...data, id };
  //       })
  //     ),
  //   tap(all => console.log(all))
  // )

  allCategorizedActivities$ = of(ACTIVITIES)
    .pipe(
      map((allActivities: IActivity[]) =>
        Object.values(allActivities.reduce((acc, activity) => {
          if (acc[<any>activity.category]) {
            acc[<any>activity.category].activities.push(activity)
          } else {
            acc[<any>activity.category] = { category: activity.category, activities: [activity] }
          }
          return acc
        }, [] as ICategorizedActivity[]))
      ),
      catchError(this.handleError)
    )

  getCategoryData(activityCategory: string): Observable<IActivity[]> {
    return this.allCategorizedActivities$
    .pipe(
      map(allCategorizedActivities =>
        allCategorizedActivities.find(categorizedActivity => categorizedActivity.category == activityCategory)?.activities as IActivity[]
      )
    )
  }

  getActivityData(activityCategory:string, id: number): Observable<IActivity> {
    return this.getCategoryData(activityCategory)
      .pipe(map(categoryActivities => categoryActivities.find(activity => activity.activityId === id) as IActivity))
  }



  // ERROR HANDLER
  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send this to some remote logging infra instead of just console logging them
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.log(err);
    return throwError(() => errorMessage)
  }

}
