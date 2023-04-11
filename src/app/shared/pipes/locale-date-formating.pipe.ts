import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'localeDateFormating'
})
export class LocaleDateFormatingPipe implements PipeTransform {

  transform(value: Date): string {
    let displayDate: string;

    const currentDate = DateTime.local()
    const specificDate = DateTime.fromISO(value)
    const diffInMs = currentDate.diff(specificDate, "milliseconds");
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 24) {
      displayDate = `${specificDate.toRelativeCalendar()} at ${specificDate.toLocaleString(DateTime.TIME_SIMPLE)}`;
    }
    else if (diffInDays < 2) {
      displayDate = `${specificDate.toRelativeCalendar()} at ${specificDate.toLocaleString(DateTime.TIME_SIMPLE)}`;
    } else {
      displayDate = specificDate.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
    }

    return displayDate;
  }

}
