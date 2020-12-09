import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, map, take, timeout } from 'rxjs/operators';
import { QueryOptions } from './database-generic.service';
import { Logger as logger } from '@app-core/logger';
import firebase from 'firebase/app';
import { watch } from "rxjs-watcher";

type QueryModel = Omit<QueryOptions, 'path'>;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private _defaultQuery: QueryModel = {
    orderBy: 'createdAt',
    orderDirection: 'asc',
    limitTo: 20,
    limitToLast: 20,
  };

  constructor (
    private _firestore: AngularFirestore,
  ) { }

  private get _getServerTimeStamp(): any {
    // return firebase.default.firestore.FieldValue.serverTimestamp();
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  createId(): string {
    return this._firestore.createId();
  }


  /**
   *
   *
   * Returns an Observable of a collection of items from a given query options.
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
  collection$<T>(
    path: string,
    options: Partial<QueryModel> = this._defaultQuery
  ): Observable<T[]> {
    // logger.collapsed('[database.service] collection$', [options]);

    const opts: QueryModel = Object.assign(this._defaultQuery, options);

    return this._firestore.collection<T>(
      path,
      // ref
      // ref => {
      //   let query = ref.orderBy(opts.orderBy, opts.orderDirection);
      //   query = opts.limitToLast ? query.limitToLast(opts.limitToLast) : query.limit(opts.limitTo);
      //   query = opts.startAt ? query.startAt(opts.startAt) : query;

      //   return query;
      // }
    ).valueChanges({ idField: 'id' })
      .pipe(
        watch(`[home.service] products()`, 2),
        tap(val => logger.collapsed(`[home.service] products() tap val =>\n`, [val]))
      );
  }

  /**
   *
   * Returns a collection snapshot.
   *
   */
  collection<T>(
    path: string,
    options: Partial<QueryModel> = this._defaultQuery
  ): Promise<T[]> {
    logger.collapsed('[database.service] collection', [options]);

    const opts: QueryModel = Object.assign(this._defaultQuery, options);

    return this._firestore.collection<T>(
      path,
      ref => {
        let query = ref.orderBy(opts.orderBy, opts.orderDirection);
        query = opts.limitToLast ? query.limitToLast(opts.limitToLast) : query.limit(opts.limitTo);
        query = opts.startAt ? query.startAt(opts.startAt) : query;

        return query;
      }
    ).valueChanges({ idField: 'id' }).pipe(
      tap(res => logger.collapsed('[database.service] collection()', ['Response\n', res]))
    ).toPromise();
  }

  docOrNull$<T>(id: string, collectionPath: string): Observable<T | null> {
    logger.startCollapsed(
      `[database.service] [docOrNull$()]`,
      [{ log: ['id:', id], type: 'warn' }]
    );

    const fullPath = `${collectionPath}/${id}`;

    return this._firestore.doc<T>(fullPath).valueChanges({ idField: 'id' })
      .pipe(
        tap( // LOGGING DATA
          val => logger.endCollapsed([`RESPONSE streaming from [${fullPath}]`, val]),
          err => logger.endCollapsed([`ERROR streaming from [${fullPath}] `, err]),
        ),
        map(doc => doc ? doc as unknown as T : null)
      );
  }

  /**
   *
   * Returns a document snapshot.
   *
   */
  docOrNull<T>(id: string, collectionPath: string): Promise<T | null> {
    logger.startCollapsed(
      `[database.service] [docOrNull()]`,
      [{ log: ['id:', id, '\ncollectionPath', collectionPath], type: 'warn' }]
    );

    return this._firestore.doc<T>(`${collectionPath}/${id}`)
      .valueChanges({ idField: 'id' })
      .pipe(
        map(doc => doc as unknown as T),
        take(1)
      ).toPromise();
  }
  // docOrNull<T>(id: string, collectionPath: string): Promise<T> {
  //   logger.startCollapsed(
  //     `[database.service] [docOrNull()]`,
  //     [{ log: ['id:', id, '\ncollectionPath', collectionPath], type: 'warn' }]
  //   );

  //   return this._firestore.doc<T>(`${collectionPath}/${id}`).get().pipe(
  //     map(doc => doc.data as unknown as T),
  //     watch(`[database.service] docOrNull$`, 10)
  //   ).toPromise();
  // }

  create<T>(document: T, collectionPath: string, docId?: string): Promise<void> {
    logger.collapsed(
      `[database.service] [create()]`,
      [`documentId: ${docId}`, 'document', document, `path: ${collectionPath}`]
    );

    return this._firestore
      .collection(collectionPath)
      .doc(docId)
      .set(
        {
          ...document,
          lastUpdate: this._getServerTimeStamp()
        },
        { merge: true }
      );
  }

  update<T>(document: T, collectionPath: string, docId: string): Promise<void> {
    logger.startCollapsed(
      `[database.service] [update()]`,
      [`documentId: ${docId}`, 'document', document, `path: ${collectionPath}`]
    );

    return this._firestore
      .collection(collectionPath)
      .doc(docId)
      .update(Object.assign({}, document))
      .then(() => logger.endCollapsed());
  }

  delete(id: string, collectionPath: string): Promise<void> {
    logger.startCollapsed(
      `[database.service] [delete()]`,
      [`documentId: ${id}`, `path: ${collectionPath}`]
    );

    return this._firestore
      .collection(collectionPath).doc(id).delete().then(() => logger.endCollapsed());
  }

  // genUpdateArrayFunction(value: any): any {
  //   return firebase.firestore.FieldValue.arrayUnion(value);
  // }

  // batchWriteDoc(batches: BatchDataModel[]): Promise<void> {
  //   logger.startCollapsed('[database.service] [batchWriteDoc]', [batches]);

  //   const batch = this._firestore.firestore.batch();

  //   for (const batchData of batches) {
  //     logger.collapsed(`writing batchData of ${batchData.docId}`, [batchData]);

  //     const docRef = this._collection(batchData.path).doc(batchData.docId).ref;

  //     batchData.update ? batch.update(docRef, { ...batchData.doc })
  //       : batch.set(docRef, { ...batchData.doc });
  //   }

  //   return batch.commit().catch(
  //     err => {
  //       logger.collapsed('[database.service] ERROR UPDATING FILE', [err]);
  //       return err ? console.error(err) : Promise.reject(err);
  //     }
  //   ).finally(() => logger.endCollapsed(['No error']));
  // }



  // *#################### FIRE STORAGE

  // addFile(inputFile: File, filePath: string): FileUploadTask {
  //   logger.collapsed(
  //     '[database.service] [addFile()]',
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
  //   logger.collapsed('[database.service] [deleteFile()]', [`filePath: ${filePath}`]);
  //   return this.storage.ref(filePath).delete();
  // }
}
