import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientCompagnyFilter'
})
export class ClientCompagnyFilterPipe implements PipeTransform {

  transform(value: any, args: any) {
    if (value.length === 0 || args === ""){
      return value;
    }
    const clients = []
    for (const client of value){
      if (client['companyName'].includes(args)){
        clients.push(client)
      }
    }
    return clients;
  }

}
