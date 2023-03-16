import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private isActivityOnSub = new BehaviorSubject<boolean>(true);
  isActivityOn$ = this.isActivityOnSub.asObservable();

  setActivityState() {
    this.isActivityOnSub.next(false);
  }

  unsetActivityState() {
    this.isActivityOnSub.next(true);
  }
}
