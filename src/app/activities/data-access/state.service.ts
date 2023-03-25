import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IActivity } from '../utils/models/iactivity';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private showcasePreviewSubject = new Subject<any>();
  showcasePreview$ = this.showcasePreviewSubject.asObservable();

  emitPreviewActivity(activity: IActivity) {
    this.showcasePreviewSubject.next(activity)
  }

  private pageTitleSubject = new BehaviorSubject<string>("Overview");
  pageTitle$ = this.pageTitleSubject.asObservable();

  emitPageTitle(pageTitle: string) {
    this.pageTitleSubject.next(pageTitle)
  }
}
