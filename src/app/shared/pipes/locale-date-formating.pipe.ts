import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'localeDateFormating'
})
export class LocaleDateFormatingPipe implements PipeTransform {

  // formattingOptions: object = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }

  transform(value: Date): string {
    return DateTime.fromJSDate(value).toLocaleString(DateTime.DATETIME_MED);
  }

}
