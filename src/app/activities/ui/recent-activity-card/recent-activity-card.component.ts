import { Component, Input, OnInit } from '@angular/core';
import { IActivity } from '../../utils/models/iactivity';
import { StateService } from '../../data-access/state.service';
import { iconSelect } from '../../utils/funcs/iconSelect';

@Component({
  selector: 'app-recent-activity-card',
  templateUrl: './recent-activity-card.component.html',
  styleUrls: ['./recent-activity-card.component.scss']
})
export class RecentActivityCardComponent implements OnInit {
  @Input() activity!: IActivity;

  icon(category: string) {
    return iconSelect(category)
  }

  constructor() {}

  ngOnInit(): void {}
}
