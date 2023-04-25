import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { ActivityFormComponent } from './activity-form.component';


@NgModule({
  declarations: [
    ActivityFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule,
    RouterModule.forChild([
      {
        path: '',
        component: ActivityFormComponent
      }
    ])
  ]
})
export class ActivityFormModule { }
