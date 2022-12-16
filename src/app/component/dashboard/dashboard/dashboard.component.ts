import { Component, OnInit } from '@angular/core';
import {log} from "util";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  roleUser = localStorage.getItem('userAccount').toString()
  role: string[] = []
  constructor() { }

  ngOnInit(): void {
    this.role.push(localStorage.getItem('Roles'))
    console.log(this.role)
    this.role.includes('ROLE_ADMIN') ? console.log('oui') : console.log('non')
  }

}
