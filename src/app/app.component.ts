import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BasketService } from './pages/bascket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  showNavbar = false;
  loadingRoute = true;

  constructor (
    private _router: Router,
    public basket: BasketService
  ) {
    this._router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          console.log('navigation starts');
          this.loadingRoute = true;
        }
        else if (event instanceof NavigationEnd) {
          console.log('navigation ends');
          this.loadingRoute = false;
        }
      },
      error => {
        this.loadingRoute = false;
        console.log(error);
      }
    );
  }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }


}
