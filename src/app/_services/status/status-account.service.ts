import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusAccountService {

  private status: string;
  constructor() { }

  allStatus(st: string): string{
    switch (st) {
      case 'STORE_KEEPER': this.status = 'MAGASINIER'
        break;
      case 'MANAGER_COUPON': this.status = 'GESTIONNAIRE DE COUPON'
        break;
      case 'MANAGER_STORE': this.status = 'GESTIONNAIRE DE MAGASIN'
        break;
      case 'MANAGER_STATION': this.status = 'GESTIONNAIRE DE STATION'
        break;
      case 'MANAGER_ORDER': this.status = 'GESTIONNAIRE DE COMMANDE'
        break;
      case 'TREASURY': this.status = 'CAISSIER'
        break;
      case 'CUSTOMER_SERVICE': this.status = 'SERVICE CLIENT'
        break;
      case 'POMPIST': this.status = 'POMPISTE'
        break;
    }
    return this.status
  }
}
