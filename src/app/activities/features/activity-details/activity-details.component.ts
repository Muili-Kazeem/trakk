import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, catchError, map, of, startWith, switchMap, tap } from 'rxjs';

import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { MapService } from './map.service';
import { IActivity } from '../../utils/models/iactivity';
import { iconSelect } from '../../utils/funcs/iconSelect';
import { IRequestState } from '../../utils/models/iRequestState';


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor( private activitiesService: ActivitiesDataService, private route: ActivatedRoute, private mapService: MapService ) {};
  ngOnInit(): void {};
  icon(category: string) { return iconSelect(category) };

  activitySub!: Subscription;
  activityId!: string;
  activityCategory!: string;
  activity!: IActivity;

  activity$: Observable<IRequestState<IActivity>> = this.route.paramMap.pipe(
    switchMap(route => {
      this.activityCategory = route.get("activity")!;
      this.activityId = route.get("id")!;
      console.log(this.activityCategory, this.activityId);
      return this.activitiesService.getActivityData(this.activityCategory, this.activityId);
    }),
    // tap(all => console.log(all)),
    map((value) => ({isLoading: false, value})),
    catchError(err => {
      // this.errorMessage = err;
      return of({isLoading: false, err})
    }),
    startWith({isLoading: true})
  );

  ngAfterViewInit() {
    this.activitySub = this.activity$.pipe(map(({value}) => value))
      .subscribe( data => { this.mapService.buildMap(data!); this.activity = data!; } )
  }

  applyGeo() {
    this.mapService.lineAnimate(this.activity);
  }


  ngOnDestroy(): void {
    if (this.activitySub) { this.activitySub.unsubscribe() }
  }

}
