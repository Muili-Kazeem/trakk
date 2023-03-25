import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityOnComponent } from '../../features/activity-on/activity-on.component';
import { StateService } from '../state.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityOnGuard implements CanDeactivate<ActivityOnComponent> {
  constructor(private router: Router, private state: StateService) {}

  canDeactivate(
    component: ActivityOnComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.started && component.ongoing) {
        return confirm("Will you go ahead?");
      }
    return true;
  }

}
