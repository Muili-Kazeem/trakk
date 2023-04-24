import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, catchError, map, of, startWith, switchMap } from 'rxjs';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { MessageService } from 'primeng/api';
import { MapService } from './map.service';
import { IActivity } from '../../utils/models/iactivity';
import { iconSelect } from '../../utils/funcs/iconSelect';
import { IRequestState } from '../../utils/models/iRequestState';


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss'],
  providers: [MessageService]
})
export class ActivityDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private activitiesService: ActivitiesDataService,
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService,
    private messageService: MessageService
  ) {};
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
      return this.activitiesService.getActivityData(this.activityCategory, this.activityId);
    }),
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

  shareLink() {

  }

  copyLink() {
    navigator.clipboard.writeText("Hi there").then(
      cb => {
        this.messageService.add({ key:'notification', summary:"Link copied", closable:false, life:2000 });
      }
    )
  }

  addToFav() {

  }

  delete() {
    if(confirm("Are you sure you want to delete this activity?")) {
      this.activitiesService.deleteActivity(this.activityId).subscribe(
        (done: void) => {
          this.messageService.add({ key:'notification', summary:"Activity deleted", closable:false, life:3000 });
         this.router.navigateByUrl(`/activities`)
        }
      )
    }
  }

  ngOnDestroy(): void {
    if (this.activitySub) { this.activitySub.unsubscribe() }
  }

}
