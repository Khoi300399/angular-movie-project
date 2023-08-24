import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringify',
})
export class StringifyPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    return String(value);
  }
}
