import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HomeService} from './home.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(public homeSvc: HomeService) {}

  ngOnInit(): void {}
}
