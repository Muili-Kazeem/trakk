import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { ActivitiesDataService } from '../../data-access/activities-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IActivity } from '../../utils/models/iactivity';
import { StateService } from '../../data-access/state.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  faStart = faBolt;

  activityId!: string

  activityForm!: FormGroup;
  activityData!: IActivity;


  constructor(private activitiesService: ActivitiesDataService,
    private router: Router,
    private state: StateService,
    private route: ActivatedRoute,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id') as string;
    this.activityForm = this.fb.group({
      athlete: ['', [Validators.required]],
      activity: '',
      title: '',
      description: '',
    })

    // Get pageTitle from data object of route definition
    this.state.emitPageTitle(this.route.snapshot?.data["pageTitle"])
  }



  // Form data submission
  onSubmit() {
    const { valid, value} = this.activityForm
    if (!valid) {
      // show error message toast
    } else {
      // Save data and pass on to Activity on
      // Route to activity on
      if (value) {
        this.activitiesService.emitActivityFormData(value)
        this.router.navigate(["activities", value.activity, this.activityId, 'on'])
      }
    }
  }



  // Activities List and dropdown filtering
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
