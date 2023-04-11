import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityFormatingPipe } from './activity-formating.pipe';
import { LocaleDateFormatingPipe } from './locale-date-formating.pipe';
import { DurationFormattingPipe } from './duration-formatting.pipe';



@NgModule({
  declarations: [
    ActivityFormatingPipe,
    LocaleDateFormatingPipe,
    DurationFormattingPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActivityFormatingPipe,
    LocaleDateFormatingPipe,
    DurationFormattingPipe
  ]
})
export class PipesModule { }
