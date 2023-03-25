import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../../data-access/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activities-shell',
  templateUrl: './activities-shell.component.html',
  styleUrls: ['./activities-shell.component.scss']
})
export class ActivitiesShellComponent implements OnInit, AfterContentChecked {
  faMenu = faBars;
  faNotification = faBell;

  pageTitle$!: Observable<string>
  display: boolean = false;
  search: string = '';

  constructor( private route: ActivatedRoute, private state: StateService, private cdRef: ChangeDetectorRef ) {}

  ngAfterContentChecked() {
    this.pageTitle$ = this.state.pageTitle$
    this.cdRef.detectChanges()
  }

  ngOnInit() {
  }

}
