import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderRefFilter'
})
export class OrderRefFilterPipe implements PipeTransform {

  transform(value: any, args: any) {
    if (value.length === 0 || args === ""){
      return value;
    }
    const orders = []
    for (const client of value){
      if (client['internalReference'].toString().includes(args.toString())){
        orders.push(client)
      }
    }
    return orders;
  }

}
