import {Component, Input, OnInit} from '@angular/core';
import {TokenService} from "../../../_services/token/token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstName: string | null = '';
  lastName: string | null = '';
  isLogged: boolean = false;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.firstName = localStorage.getItem('firstName')
    this.lastName = localStorage.getItem('firstName')
  }

  logout(){
    this.tokenService.clearToken();
  }

}
