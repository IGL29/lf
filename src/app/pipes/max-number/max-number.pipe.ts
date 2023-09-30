import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxNumber'
})
export class MaxNumberPipe implements PipeTransform {
  transform(value: number, maxValue: number, postFix = ''): string {
    if (value <= maxValue) {
      return `${value}`;
    }
    return `${maxValue}${postFix}`;
  }
}
