import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormatting'
})
export class DurationFormattingPipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60000);
    const seconds: string = ((value % 60000) / 10000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }

}
