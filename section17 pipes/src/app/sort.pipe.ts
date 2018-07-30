import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(value: any[], sortKey: string): any[] {
    if (value.length > 1) {
      return value.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      });
    }
    return value;
  }
}
