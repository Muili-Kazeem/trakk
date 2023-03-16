import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  faStart = faBolt;

  activityData = {
    athlete: '',
    activity: '',
    title: '',
    description: '',
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const { valid, value} = form
    if (!valid) {
      // show error message toast
    } else {
      // Save data and pass on to Activity on
      // Route to activity on
    }
  }

  activitiesList: string[] = ["Riding", "Hiking", "Running", "Walking", "Jogging", "Skiing", "Paralympcing"];
  filteredActivities!: any[];

  filterActivity(event: { query: any; }) {
    let filtered: string[] = [];
    let query = event.query;

    for(let i = 0; i < this.activitiesList.length; i++) {
        let activity = this.activitiesList[i];
        if (activity.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(activity);
        }
    }
    this.filteredActivities = filtered;
  }

}
