import { Component } from '@angular/core';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  faOverview = faChartPie;
  faStart = faBolt;
  faActivity = faPersonWalking;
  faStats = faChartSimple;
  faSettings = faSlidersH;
  faUser = faUser;
  faLogOut = faSignOut;
}
