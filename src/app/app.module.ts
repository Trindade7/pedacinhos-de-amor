import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import pt from '@angular/common/locales/pt-AO';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import {USE_EMULATOR as USE_DATABASE_EMULATOR} from '@angular/fire/database';
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/firestore';
import {USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/functions';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NZ_I18N, pt_PT} from 'ng-zorro-antd/i18n';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {BascketComponent} from './pages/bascket/bascket.component';
import {HomeComponent} from './pages/home/home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ProductDetailsComponent} from './pages/product-details/product-details.component';
import {ProductsComponent} from './pages/products/products.component';
import {SharedModule} from './shared/shared.module';
import { UserComponent } from './pages/user/user.component';

// import pt from '@angular/common/locales/pt';
registerLocaleData(pt);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProductDetailsComponent,
    ProductsComponent,
    BascketComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzDrawerModule,

    AppRoutingModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: pt_PT},

    // *#### STRART EMULATORS
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9099] : undefined,
    },
    {
      provide: USE_DATABASE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9000] : undefined,
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined,
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 5001] : undefined,
    },
    // *#### END
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
