import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { ActivityOnGuard } from '../../data-access/guards/activity-on.guard';
import { ActivityOnComponent } from './activity-on.component';

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
})
export class ActivityOnModule { }
