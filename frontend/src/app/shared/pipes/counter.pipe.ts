import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'counter',
  standalone: true,
})
export class CounterPipe implements PipeTransform {
  transform(value: number = 0, limit: number): string {
    return `${value}/${limit}`;
  }
}
