import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { ActivityOverviewComponent } from './activity-overview.component';
import { TopActivityOverviewComponent } from '../../ui/top-activity-overview/top-activity-overview.component';
import { ActivityCardComponent } from '../../ui/activity-card/activity-card.component';


@NgModule({
  declarations: [
    ActivityOverviewComponent,
    ActivityCardComponent,
    TopActivityOverviewComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: ActivityOverviewComponent
      }
    ])
  ]
})
export class ActivityOverviewModule { }
