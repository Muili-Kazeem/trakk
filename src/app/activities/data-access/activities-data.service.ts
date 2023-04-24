import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, map, throwError, withLatestFrom, take, filter, tap, shareReplay, switchMap } from 'rxjs';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionSnapshots, deleteDoc, doc } from '@angular/fire/firestore';

import { AuthService } from 'src/app/auth/data-access/auth.service';
import { IActivity, ICategorizedActivity } from '../utils/models/iactivity';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesDataService {
  //Inject firestore and services into constructor
  constructor(private fireStore: Firestore, private authService: AuthService) {}

  // Passing new activity data from form through activity recording to Firstore using BehaviourSubject
  private activityFormDataSubject = new BehaviorSubject<{}>({})
  activityFormData$ = this.activityFormDataSubject.asObservable()

  private activityDataSubject = new BehaviorSubject<{}>({})
  activityData$ = this.activityDataSubject.asObservable()

  emitActivityFormData(activity: IActivity) {
    this.activityFormDataSubject.next(activity)
  }

  postActivity(data: any) {
    return this.authService.getAuth().pipe(
      switchMap(user => addDoc<IActivity>(collection(this.fireStore, `activities/${user?.uid}/activities`) as CollectionReference<IActivity>, data)),
    )
  }

  deleteActivity(docId: string) {
    return this.authService.getAuth().pipe(
      switchMap(user => deleteDoc(doc(this.fireStore, `activities/${user?.uid}/activities/${docId}`) as DocumentReference<IActivity>)),
    )
  }

  emitActivityData(activityData: {}) {
    this.activityDataSubject.next(activityData)

    return this.activityData$.pipe(take(1))
      .pipe(
        withLatestFrom(this.activityFormData$.pipe(filter(value => Object.keys(value).length !== 0), take(1))),
        map(([activityData, formData]) => ({ ...activityData, ...formData } as IActivity)),
        tap(all => console.log(all)),
        switchMap(data => this.postActivity(data))
      )
  }


  // Fetch user data from firestore after switchMapping from authState upon getting userId
  allCategorizedActivities$: Observable<ICategorizedActivity[]> = this.authService.getAuth().pipe(
    switchMap(user => collectionSnapshots(collection(this.fireStore, `activities/${user?.uid}/activities`))
      .pipe(
        map(
          all => all.map(all => {
            const data = all.data() as IActivity;
            const activityId = all.id;
            return { ...data, activityId };
          })
        ),
        // Also categorize all fetched data into their categories
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
        // Use shareReplay for a little bit of caching
        shareReplay(1),
        catchError(this.handleError),
        tap(all => console.log(all))
      )
    )
  )

  // Get data for a particular activity category
  getCategoryData(activityCategory: string): Observable<IActivity[]> {
    return this.allCategorizedActivities$
    .pipe(
      map(allCategorizedActivities =>
        allCategorizedActivities.find(categorizedActivity => categorizedActivity.category == activityCategory)?.activities as IActivity[]
      )
    )
  };

  // Get data for a specific activity
  getActivityData(activityCategory:string, id: string): Observable<IActivity> {
    return this.getCategoryData(activityCategory)
      .pipe(
        map(categoryActivities => categoryActivities.find(activity => activity.activityId === id) as IActivity)
      )
  };



  // ERROR HANDLER
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.log(err);
    return throwError(() => new Error(errorMessage))
  }

}
