import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-activities-shell',
  templateUrl: './activities-shell.component.html',
  styleUrls: ['./activities-shell.component.scss']
})
export class ActivitiesShellComponent implements OnInit {
  faMenu = faBars;
  faNotification = faBell;

  display: boolean = false;
  search: string = '';

  constructor( ) {}

  ngOnInit() {}

}
