import { Pipe, PipeTransform } from '@angular/core';
import { EnumFormat, FORMAT_NAME, Format, FormatName } from '~types/product';

@Pipe({
  name: 'productFormatName'
})
export class ProductFormatNamePipe implements PipeTransform {
  transform(value: string): FormatName {
    return FORMAT_NAME[EnumFormat[<Format>value]] ?? value;
  }
}
