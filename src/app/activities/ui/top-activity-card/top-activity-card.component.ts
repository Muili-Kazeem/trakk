import { Component, Input, OnInit } from '@angular/core';
import { faBolt, faClock, faRoad, faRunning, faWind } from '@fortawesome/free-solid-svg-icons';
import { Duration } from 'luxon';

@Component({
  selector: 'app-top-activity-card',
  templateUrl: './top-activity-card.component.html',
  styleUrls: ['./top-activity-card.component.scss']
})
export class TopActivityCardComponent implements OnInit {
  @Input() activity!: {category: string, distance: number, duration: number}
  @Input() numOfActivity!: number;

  faRun = faRunning;
  faStart = faBolt;
  faClock = faClock;
  faSpeed = faWind;
  faRoad = faRoad;

  ngOnInit(): void {
    // this.durationDisplay = Duration.fromMillis(this.activity.duration).toFormat("mm:ss")
  }

}
