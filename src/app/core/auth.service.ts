import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Logger as logger } from '@app-core/logger';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DatabaseService } from './database.service';
import { UserModel } from './models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor (
    private _afAuth: AngularFireAuth,
    private _db: DatabaseService,
    private _router: Router
  ) { }
  private _parseFireUserToUser(fireUser: firebase.User | null): UserModel {
    if (!fireUser) {
      throw new Error('Error getting User.');
    }
    return {
      name: fireUser.displayName ?? fireUser.uid,
      email: fireUser.email ?? '',
      id: fireUser.uid,
      isVerified: fireUser.emailVerified,
      phoneNumber: fireUser.phoneNumber ?? '',
      photoUrl: fireUser.photoURL ?? ''
    };
  }

  private _processUserData(credential: firebase.auth.UserCredential): Promise<void> {
    logger.collapsed('[fireauth.service] _processUserData', [credential]);

    if (credential.additionalUserInfo?.isNewUser) {
      const user = this._parseFireUserToUser(credential.user);
      return this._db.create(user, user.id);
    }

    return Promise.resolve();
  }

  get userOrNull$(): Observable<UserModel | null> {
    return this._afAuth.authState.pipe(
      switchMap(user => user
        ? this._db.docOrNull$<UserModel>(user.uid, 'users')
        : of(null)
      )
    );
  }

  async googleSignIn(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this._afAuth.signInWithPopup(provider);
    return this._processUserData(credential);
  }

  async facebookSignIn(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this._afAuth.signInWithPopup(provider);
    return this._processUserData(credential);
  }

  async emailAndPasswordSignUp(email: string, password: string): Promise<void> {
    const credential = await this._afAuth.createUserWithEmailAndPassword(email, password);
    return this._processUserData(credential);
  }

  async emailAndPasswordSignIn(email: string, password: string): Promise<any> {
    const credential = await this._afAuth.signInWithEmailAndPassword(email, password);
    return this._processUserData(credential);
  }

  logout(): Promise<void> {
    return this._afAuth.signOut().then(
      () => {
        this._router.navigate(['/login']);
      }
    );
  }
}
