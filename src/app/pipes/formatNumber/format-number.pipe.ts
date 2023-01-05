import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return parseInt(value).toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g,'$1 ');
  }

}
