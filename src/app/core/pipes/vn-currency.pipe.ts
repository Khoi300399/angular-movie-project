import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vnCurrency',
})
export class VnCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    const formattedValue = value.toLocaleString();
    return `${formattedValue} VND`;
  }
}
