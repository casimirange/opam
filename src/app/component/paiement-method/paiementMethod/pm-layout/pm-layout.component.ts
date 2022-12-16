import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pm-layout',
  templateUrl: './pm-layout.component.html',
  styleUrls: ['./pm-layout.component.css']
})
export class PmLayoutComponent implements OnInit {
  roleUser = localStorage.getItem('userAccount').toString()
  constructor() { }

  ngOnInit(): void {
  }

}
