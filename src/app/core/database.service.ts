import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor (
    private _firestore: Angufires
  ) { }


}
