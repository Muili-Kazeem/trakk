import { Component, Input, OnInit } from '@angular/core';
import { IActivity } from '../../utils/models/iactivity';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {

  @Input() activity!: IActivity;

  constructor() { }

  ngOnInit(): void {
  }

}
