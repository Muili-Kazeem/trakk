import { Component, Input, OnInit } from '@angular/core';
import { Duration } from 'luxon';
import { iconSelect } from '../../utils/funcs/iconSelect';

@Component({
  selector: 'app-top-activity-card',
  templateUrl: './top-activity-card.component.html',
  styleUrls: ['./top-activity-card.component.scss']
})
export class TopActivityCardComponent implements OnInit {
  @Input() activity!: {category: string, distance: number, duration: number}
  @Input() numOfActivity!: number;

  icon(category: string) {
    return iconSelect(category)
  }

  ngOnInit(): void {
    // this.durationDisplay = Duration.fromMillis(this.activity.duration).toFormat("mm:ss")
  }

}
