import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityOverviewComponent } from './activity-overview.component';
import { RouterModule } from '@angular/router';
import { ActivityCardComponent } from '../../ui/activity-card/activity-card.component';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    ActivityOverviewComponent,
    ActivityCardComponent,
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
