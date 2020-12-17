import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Logger as logger } from '@app-core/logger';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private _authService: AuthService,
    private _router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return this._authService.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          logger.collapsed('[auth.guard] canActivate', [loggedIn]);

          this._router.navigate(['/login']);
        }
      })
    );
  }
}
