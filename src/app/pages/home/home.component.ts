import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <app-banner></app-banner>
  `,
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor () { }

  ngOnInit(): void {
  }

}
