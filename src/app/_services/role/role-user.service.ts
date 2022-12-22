import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleUserService {

  private role: string;
  constructor() { }

  allRole(st: string): string{
    switch (st) {
      case 'ROLE_USER': this.role = 'UTILISATEUR'
        break;
      case 'ROLE_ADMIN': this.role = 'ADMINISTRATEUR'
        break;
      case 'ROLE_SUPERADMIN': this.role = 'SUPER ADMINISTRATEUR'
        break;
      case 'ROLE_AGENT': this.role = 'AGENT'
        break;
    }

    return this.role
  }
}
