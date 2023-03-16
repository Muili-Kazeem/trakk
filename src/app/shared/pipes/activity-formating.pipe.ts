import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityFormating'
})
export class ActivityFormatingPipe implements PipeTransform {

  transform(value: number) {
    if (value <= 1) {
      return `${value} activity`
    } else {
      return `${value} activities`
    }

  }

}
