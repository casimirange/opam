import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station-layout',
  templateUrl: './station-layout.component.html',
  styleUrls: ['./station-layout.component.css']
})
export class StationLayoutComponent implements OnInit {
  roleUser = localStorage.getItem('userAccount').toString()
  constructor() { }

  ngOnInit(): void {
  }

}
