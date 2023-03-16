import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityFormComponent } from './activity-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    ActivityFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
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
