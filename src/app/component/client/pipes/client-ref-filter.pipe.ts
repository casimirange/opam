import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientRefFilter'
})
export class ClientRefFilterPipe implements PipeTransform {

  transform(value: any, args: any) {
    if (value.length === 0 || args === ""){
      return value;
    }
    const clients = []
    for (const client of value){
      if (client['internalReference'].toString().includes(args)){
        clients.push(client)
      }
    }
    return clients;
  }

}
