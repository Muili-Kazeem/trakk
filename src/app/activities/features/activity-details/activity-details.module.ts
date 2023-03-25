import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailsComponent } from './activity-details.component';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    ActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: ActivityDetailsComponent
      }
    ])
  ]
})
export class ActivityDetailsModule { }
