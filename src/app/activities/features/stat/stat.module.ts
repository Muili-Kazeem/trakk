import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatPropComponent } from '../../ui/stat-prop/stat-prop.component';
import { PrimeNgModule } from 'src/app/shared/ui/prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { StatComponent } from './stat.component';
import { FormatValuePipe } from '../../utils/pipes/format-value.pipe';

@NgModule({
  declarations: [
    StatComponent,
    StatPropComponent,
    FormatValuePipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule.forChild([
      {
        path: '',
        component: StatComponent
      }
    ]),
  ]
})
export class StatModule { }
