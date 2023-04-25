import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {

  transform(value: number, format: string | undefined) {
    if (format === "distance") {
      return `${value} km`
    } else if (format === "time") {
      const minutes: number = Math.floor(value / 60000);
      const seconds: string = ((value % 60000) / 10000).toFixed(0);
      return `${minutes}:${seconds.padStart(2, '0')}`;
    } else {
      return value
    }
  }

}
