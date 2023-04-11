import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { ActivityOnComponent } from './activity-on.component';
import { ActivityOnGuard } from '../../data-access/guards/activity-on.guard';

@NgModule({
  declarations: [
    ActivityOnComponent,
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
  // entryComponents: [
  //   ActiveActivityMapComponent
  // ]
})
export class ActivityOnModule { }
