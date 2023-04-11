import { Component } from '@angular/core';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-activity-prop',
  templateUrl: './new-activity-prop.component.html',
  styleUrls: ['./new-activity-prop.component.scss']
})
export class NewActivityPropComponent {

  faStart = faBolt;
}
