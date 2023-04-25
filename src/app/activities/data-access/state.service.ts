import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private pageTitleSubject = new BehaviorSubject<string>("Overview");
  pageTitle$ = this.pageTitleSubject.asObservable();

  emitPageTitle(pageTitle: string) {
    this.pageTitleSubject.next(pageTitle)
  }
}
