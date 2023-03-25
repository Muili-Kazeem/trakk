import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { ActivityOnComponent } from './activity-on.component';
import { ActiveActivityMapComponent } from '../../ui/active-activity-map/active-activity-map.component';
import { ActivityOnGuard } from '../../data-access/guards/activity-on.guard';

@NgModule({
  declarations: [
    ActivityOnComponent,
    ActiveActivityMapComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule.forChild([
      {
        path: '',
        canDeactivate: [ActivityOnGuard],
        component: ActivityOnComponent
      }
    ]),
  ],
  entryComponents: [
    ActiveActivityMapComponent
  ]
})
export class ActivityOnModule { }