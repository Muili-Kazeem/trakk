import { Component, Input, OnInit } from '@angular/core';
import { faBolt, faClock, faRoad, faRunning, faWind } from '@fortawesome/free-solid-svg-icons';
import { IActivity } from '../../utils/models/iactivity';

@Component({
  selector: 'app-recent-activity-card',
  templateUrl: './recent-activity-card.component.html',
  styleUrls: ['./recent-activity-card.component.scss']
})
export class RecentActivityCardComponent implements OnInit {
  @Input() activity!: IActivity;

  faRun = faRunning;
  faStart = faBolt;
  faClock = faClock;
  faSpeed = faWind;
  faRoad = faRoad;

  ngOnInit(): void {

  }
}
