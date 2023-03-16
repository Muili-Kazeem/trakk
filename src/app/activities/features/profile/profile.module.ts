import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      }
    ]),
  ]
})
export class ProfileModule { }
