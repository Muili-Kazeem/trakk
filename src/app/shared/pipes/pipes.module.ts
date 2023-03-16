import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityFormatingPipe } from './activity-formating.pipe';
import { LocaleDateFormatingPipe } from './locale-date-formating.pipe';



@NgModule({
  declarations: [
    ActivityFormatingPipe,
    LocaleDateFormatingPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActivityFormatingPipe,
    LocaleDateFormatingPipe
  ]
})
export class PipesModule { }
