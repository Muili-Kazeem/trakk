import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { ActivitiesHomeComponent } from './activities-home.component';
import { GraphCardComponent } from '../../ui/graph-card/graph-card.component';
import { TopActivityCardComponent } from '../../ui/top-activity-card/top-activity-card.component';
import { RecentActivityCardComponent } from '../../ui/recent-activity-card/recent-activity-card.component';
import { NewActivityPropComponent } from '../../ui/new-activity-prop/new-activity-prop.component';


@NgModule({
  declarations: [
    ActivitiesHomeComponent,
    GraphCardComponent,
    TopActivityCardComponent,
    RecentActivityCardComponent,
    NewActivityPropComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: ActivitiesHomeComponent
      }
    ]),
  ]
})
export class ActivitiesHomeModule { }
