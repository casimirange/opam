import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  roleUser = localStorage.getItem('userAccount').toString()
  constructor() { }

  ngOnInit(): void {
  }

}
