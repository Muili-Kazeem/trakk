import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'localeDateFormating'
})
export class LocaleDateFormatingPipe implements PipeTransform {

  transform(value: Date): string {
    // SPRINKLE IF/ELSE AND CUSTOM LOGIC EVERYWHERE

    // let date = DateTime.fromJSDate(value).toRelativeCalendar()
    let date = DateTime.fromJSDate(value).toLocaleString(DateTime.DATETIME_FULL);
    date = date.split(" ").slice(0, -2).join(" ")
    return date;
  }

}
