import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BascketComponent} from './pages/bascket/bascket.component';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ProductDetailsComponent} from './pages/product-details/product-details.component';
import {ProductsComponent} from './pages/products/products.component';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'basket', component: BascketComponent},
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent},
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
