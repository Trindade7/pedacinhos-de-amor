import { Component, OnInit } from '@angular/core';
import { BannerModel, BannerSimpleModel } from '@app/core/models/banner-model';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  events: BannerSimpleModel[] = [
    {
      name: 'Casamentos',
      color: '#6699ff',
      imageUrl: '../../../assets/images/cake-categories/wed22.png'
    },
    {
      name: 'Aniversários',
      color: '#3333cc',
      imageUrl: '../../../assets/images/cake-categories/birthdays.png'
    },
    {
      name: 'Natal',
      color: '#4AB9D4',
      imageUrl: '../../../assets/images/cake-categories/xmas.png'
    },
    {
      name: 'Ano Novo',
      color: '#edeaf5',
      imageUrl: '../../../assets/images/cake-categories/new-year.png'
    },
    {
      name: 'Páscoa',
      color: '#F9F0E2',
      imageUrl: '../../../assets/images/cake-categories/easter.png'
    },
    {
      name: 'Outros',
      color: '#FFCCFF',
      imageUrl: '../../../assets/images/cake-categories/wed3.png'
    },
  ];

  constructor () { }

  ngOnInit(): void {
  }

}
