import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Logger as logger } from '@app-core/logger';

import firebase from 'firebase/app';

export interface QueryOptions {
  limitToLast: number;
  orderBy: 'createdAt' | 'updatedAt' | 'name' | 'email';
  orderDirection: 'asc' | 'desc';
  limitTo: number;
  arrayContains?: {
    arrayName: string;
    value: any;
  };
  path: string | null;
  startAt?: any;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseGenericService<T> {
  private _defaultQuery: QueryOptions = {
    orderBy: 'createdAt',
    orderDirection: 'asc',
    limitTo: 20,
    limitToLast: 20,
    path: null,
  };

  protected basePath = '';

  constructor (
    @Inject(AngularFirestore) private _firestore: AngularFirestore,
  ) { }
  private _collection(path: string = this.basePath): AngularFirestoreCollection<T> {
    return this._firestore.collection(path);
    // return this.firestore.collection(path, ref => ref.orderBy(orderBy, orderDirection));
  }

  setBasePath(path: string): void {
    this.basePath = path;
  }

  get getServerTimeStamp(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
    // return '';
  }

  createId(): string {
    return this._firestore.createId();
  }


  /**
   *
   *
   * Returns an Observable of a collection of items.
   *
   * Default options are:
   *
   * #orderBy: 'createdAt',
   *
   * #orderDirection: 'asc',
   *
   * #limitTo: 20,
   *
   * #path: null,
   *
   */
  collection$(queryOptions: Partial<QueryOptions> = this._defaultQuery): Observable<T[]> {
    logger.collapsed('[database-generic.service] collection$', [queryOptions]);

    const opts: QueryOptions = Object.assign(this._defaultQuery, queryOptions);

    return this._firestore.collection<T>(
      opts.path ?? this.basePath,
      ref => {

        // if (opts.arrayContains) {
        //   return ref.where(
        //     opts.arrayContains.arrayName,
        //     'array-contains',
        //     opts.arrayContains.value
        //   );
        // }

        let query = ref.orderBy(opts.orderBy, opts.orderDirection);
        query = opts.limitToLast ? query.limitToLast(opts.limitToLast) : query.limit(opts.limitTo);
        query = opts.startAt ? query.startAt(opts.startAt) : query;

        return query;
      }
    ).valueChanges({ idField: 'id' }).pipe(
      tap( // LOGGING DATA
        val => {
          logger.collapsed(
            `>firestore.servicce streaming [${this.basePath}] [collection$]`,
            [val, 'Options', queryOptions]);
        }
      )
    );
  }

  /**
   *
   * Returns a collection snapshot.
   *
   */
  collection(queryOptions: Partial<QueryOptions> = this._defaultQuery): Promise<T[]> {
    logger.collapsed('[database-generic.service] collection', [queryOptions]);

    const opts: QueryOptions = Object.assign(this._defaultQuery, queryOptions);

    return this._firestore.collection<T>(
      opts.path ?? this.basePath
      // ref => ref
      // ref => {
      //   let query = ref.orderBy(opts.orderBy, opts.orderDirection);
      //   query = opts.limitToLast ? query.limitToLast(opts.limitToLast) : query.limit(opts.limitTo);
      //   query = opts.startAt ? query.startAt(opts.startAt) : query;

      //   return query;
      // }
    ).valueChanges({ idField: 'id' }).pipe(
      tap(res => logger.collapsed('[database-generic.service] collection()', ['Response\n', res]))
    ).toPromise();
  }

  docOrNull$(id: string): Observable<T | null> {
    logger.startCollapsed(
      `[database-generic.service] [docOrNull$()]`,
      [{ log: ['id:', id], type: 'warn' }]
    );

    const path = `${this.basePath}/${id}`;

    return this._firestore.doc<T>(path).valueChanges()
      .pipe(
        tap( // LOGGING DATA
          val => logger.endCollapsed([`RESPONSE streaming from [${path}]`, val]),
          err => logger.endCollapsed([`ERROR streaming from [${path}] `, err]),
        ),
        map(doc => doc ? doc : null)
      );
  }

  /**
   *
   * Returns a document snapshot.
   *
   */
  docOrNull(id: string): Promise<T> {
    return this._firestore.doc<T>(`${this.basePath}/${id}`).get().pipe(
      map(doc => doc.data as unknown as T)
    ).toPromise();
  }

  create(document: T, docId?: string): Promise<void> {
    logger.collapsed(
      `[database-generic.service] [create()]`,
      [`documentId: ${docId}`, 'document', document, `path: ${this.basePath}`]
    );

    return this._collection().doc(docId).set(
      {
        ...document,
        createdAt: this.getServerTimeStamp()
      },
      { merge: true }
    );
  }

  update(document: T, docId: string): Promise<void> {
    logger.startCollapsed(
      `[database-generic.service] [update()]`,
      [`documentId: ${docId}`, 'document', document, `path: ${this.basePath}`]
    );
    return this._collection().doc(docId).update(Object.assign({}, document))
      .then(() => logger.endCollapsed());
  }

  delete(id: string): Promise<void> {
    logger.startCollapsed(
      `[database-generic.service] [delete()]`,
      [`documentId: ${id}`, `path: ${this.basePath}`]
    );
    return this._collection().doc(id).delete().then(() => logger.endCollapsed());
  }

  // genUpdateArrayFunction(value: any): any {
  //   return firebase.firestore.FieldValue.arrayUnion(value);
  // }

  // batchWriteDoc(batches: BatchDataModel[]): Promise<void> {
  //   logger.startCollapsed('[database-generic.service] [batchWriteDoc]', [batches]);

  //   const batch = this._firestore.firestore.batch();

  //   for (const batchData of batches) {
  //     logger.collapsed(`writing batchData of ${batchData.docId}`, [batchData]);

  //     const docRef = this._collection(batchData.path).doc(batchData.docId).ref;

  //     batchData.update ? batch.update(docRef, { ...batchData.doc })
  //       : batch.set(docRef, { ...batchData.doc });
  //   }

  //   return batch.commit().catch(
  //     err => {
  //       logger.collapsed('[database-generic.service] ERROR UPDATING FILE', [err]);
  //       return err ? console.error(err) : Promise.reject(err);
  //     }
  //   ).finally(() => logger.endCollapsed(['No error']));
  // }



  // *#################### FIRE STORAGE

  // addFile(inputFile: File, filePath: string): FileUploadTask {
  //   logger.collapsed(
  //     '[database-generic.service] [addFile()]',
  //     ['file', inputFile, `filePath:${filePath}`]
  //   );
  //   const task = this.storage.upload(filePath + '/' + inputFile.name, inputFile);
  //   return {
  //     cancel: task.cancel,
  //     pause: task.pause,
  //     resume: task.resume,
  //     percentageChanges: task.percentageChanges(),
  //     onComplete: task.then(f => f.ref.getDownloadURL()),
  //   };
  // }

  /// Delete a file
  // deleteFile(filePath: string): Observable<any> {
  //   logger.collapsed('[database-generic.service] [deleteFile()]', [`filePath: ${filePath}`]);
  //   return this.storage.ref(filePath).delete();
  // }
}
