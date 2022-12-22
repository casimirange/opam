import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusUserService {

  private status: string;
  constructor() { }

  allStatus(st: string): string{

    switch (st) {
      case 'USER_ENABLED': this.status = 'ACTIVE'
        break;
      case 'USER_DISABLED': this.status = 'DESACTIVE'
        break;
    }

    return this.status
  }
}
