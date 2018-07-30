import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length === 0) {
      return value;
    } else {
      const arr = value.split('');
      return arr.reverse().join('');
    }
  }
}
