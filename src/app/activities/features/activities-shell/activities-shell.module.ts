import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivitiesShellRoutingModule } from './activities-shell-routing.module';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { ActivitiesShellComponent } from './activities-shell.component';
import { SidebarMenuComponent } from '../../ui/sidebar-menu/sidebar-menu.component';


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
