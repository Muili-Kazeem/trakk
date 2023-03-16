import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent
      }
    ]),
  ]
})
export class SettingsModule { }
