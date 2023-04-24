import { Component, Input } from '@angular/core';
import { IActivity } from '../../utils/models/iactivity';

@Component({
  selector: 'app-top-activity-overview',
  templateUrl: './top-activity-overview.component.html',
  styleUrls: ['./top-activity-overview.component.scss']
})
export class TopActivityOverviewComponent {
  @Input() activity!: IActivity;

  constructor() { }

  ngOnInit(): void {
  }

}
