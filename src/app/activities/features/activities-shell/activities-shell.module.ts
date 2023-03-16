import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesShellRoutingModule } from './activities-shell-routing.module';
import { ActivitiesShellComponent } from './activities-shell.component';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { SidebarMenuComponent } from '../../ui/sidebar-menu/sidebar-menu.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActivitiesShellComponent,
    SidebarMenuComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ActivitiesShellRoutingModule,
    FormsModule,
  ]
})
export class ActivitiesShellModule { }
