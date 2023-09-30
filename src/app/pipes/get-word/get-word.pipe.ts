import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getWord',
})
export class GetWordPipe implements PipeTransform {
  transform(value: string, index: number): string {
    const matches = value.match(/\S+/g);
    const result = matches && matches[index] ? matches[index] : value;
    return result;
  }
}
