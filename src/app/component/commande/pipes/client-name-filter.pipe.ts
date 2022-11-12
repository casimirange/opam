import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientNameFilter'
})
export class ClientNameFilterPipe implements PipeTransform {

  transform(value: any, args: any) {
    if (value.length === 0 || args === ""){
      return value;
    }
    const clients = []
    for (const client of value){

      if (client['completeName'].includes(args)){
        clients.push(client)
      }
    }
    return clients;
  }

}
