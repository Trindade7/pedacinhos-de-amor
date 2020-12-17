import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Logger as logger } from '@app-core/logger';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { watch } from 'rxjs-watcher';
import { map, take, tap } from 'rxjs/operators';

interface CollectionQueryModel {
  limit?: number;
  limitToLast?: number;
  orderBy?: 'createdAt';
  orderDirection?: 'asc' | 'desc';
  where?: string;
}

export interface BatchDocModel {
  path: string;
  doc: unknown;
  update?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private _defaultQuery: CollectionQueryModel = {
    // orderBy: null,
    // orderDirection: null,
    // limitToLast: 10,
    limit: 10,
  };

  constructor (private _firestore: AngularFirestore) { }

  private get _getServerTimeStamp(): unknown {
    // return firebase.default.firestore.FieldValue.serverTimestamp();
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  createId(): string {
    return this._firestore.createId();
  }

  // private _genQuery(
  //   ref: firebase.firestore.Query<firebase.firestore.DocumentData>,
  //   query: CollectionQueryModel
  // ): firebase.firestore.Query<firebase.firestore.DocumentData> {
  //   const refFiltered: any = ref;
  //   const queryFilters: any = query;

  //   Object.keys(query).forEach(key => refFiltered[key] = queryFilters[key]);

  //   console.log({ refFiltered });
  //   return refFiltered;
  // }

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
    query: CollectionQueryModel = this._defaultQuery
  ): Observable<T[]> {
    logger.collapsed('[database.service] collection$', [query]);

    return this._firestore
      .collection<T>(path, ref => {
        let collectionRef = query.limitToLast
          ? ref.limitToLast(query.limitToLast)
          : ref.limit(query.limit ?? 10);

        // collectionRef = query.orderBy
        //   ? collectionRef.orderBy(query.orderBy)
        //   : collectionRef;

        collectionRef = query.where
          ? collectionRef.where('category', '==', 'pronducts')
          : collectionRef;

        return collectionRef;
      })
      .valueChanges({ idField: 'id' })
      .pipe(
        watch('[database.service] collection$()', 2),
        tap(val =>
          logger.collapsed('[database.service] products() tap val =>\n', [val])
        )
      );
  }

  /**
   *
   * Returns a collection snapshot.
   *
   */
  collection<T>(
    path: string,
    query: Partial<CollectionQueryModel> = this._defaultQuery
  ): Promise<T[]> {
    logger.collapsed('[database.service] collection', [query]);

    return this._firestore
      .collection<T>(path, ref => {
        const collectionRef = Object.assign(ref, query);

        return collectionRef;
      })
      .valueChanges({ idField: 'id' })
      .pipe(
        tap(res =>
          logger.collapsed('[database.service] collection()', [
            'Response\n',
            res,
          ])
        )
      )
      .toPromise();
  }

  docOrNull$<T>(id: string, collectionPath: string): Observable<T | null> {
    logger.startCollapsed('[database.service] [docOrNull$()]', [
      { log: ['id:', id], type: 'warn' },
    ]);

    const fullPath = `${collectionPath}/${id}`;

    return this._firestore
      .doc<T>(fullPath)
      .valueChanges({ idField: 'id' })
      .pipe(
        tap(
          // LOGGING DATA
          val =>
            logger.endCollapsed([`RESPONSE streaming from [${fullPath}]`, val]),
          err =>
            logger.endCollapsed([`ERROR streaming from [${fullPath}] `, err])
        ),
        map(doc => (doc ? ((doc as unknown) as T) : null))
      );
  }

  /**
   *
   * Returns a document snapshot.
   *
   */
  docOrNull<T>(id: string, collectionPath: string): Promise<T | null> {
    logger.startCollapsed('[database.service] [docOrNull()]', [
      { log: ['id:', id, '\ncollectionPath', collectionPath], type: 'warn' },
    ]);

    return this._firestore
      .doc<T>(`${collectionPath}/${id}`)
      .valueChanges({ idField: 'id' })
      .pipe(
        map(doc => (doc as unknown) as T),
        take(1)
      )
      .toPromise();
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

  create<T>(
    document: T,
    collectionPath: string,
    docId?: string
  ): Promise<void> {
    logger.collapsed('[database.service] [create()]', [
      `documentId: ${docId}`,
      'document',
      document,
      `path: ${collectionPath}`,
    ]);

    const id: string = docId ?? this.createId();

    return this._firestore.doc(`${collectionPath}/${id}`).set(
      {
        ...document,
        lastUpdate: this._getServerTimeStamp,
      },
      { merge: true }
    );
  }

  update<T>(document: T, collectionPath: string, docId: string): Promise<void> {
    logger.startCollapsed('[database.service] [update()]', [
      `documentId: ${docId}`,
      'document',
      document,
      `path: ${collectionPath}`,
    ]);

    return this._firestore
      .collection(collectionPath)
      .doc(docId)
      .update({ ...document })
      .then(() => logger.endCollapsed());
  }

  delete(id: string, collectionPath: string): Promise<void> {
    logger.startCollapsed('[database.service] [delete()]', [
      `documentId: ${id}`,
      `path: ${collectionPath}`,
    ]);

    return this._firestore
      .collection(collectionPath)
      .doc(id)
      .delete()
      .then(() => logger.endCollapsed());
  }

  // genUpdateArrayFunction(value: any): any {
  //   return firebase.firestore.FieldValue.arrayUnion(value);
  // }

  batchWrite(batchDocs: BatchDocModel[]): Promise<void> {
    logger.startCollapsed('[database.service] #batchWriteDoc', [batchDocs]);

    const batch = this._firestore.firestore.batch();

    for (const batchDoc of batchDocs) {
      logger.collapsed(`writing batchData of ${batchDoc.update}`, [batchDoc]);

      const docRef = this._firestore.doc(batchDoc.path).ref;

      batchDoc.update
        ? batch.update(docRef, { ...batchDoc.doc as any })
        : batch.set(docRef, { ...batchDoc.doc as any });
    }

    return batch
      .commit()
      .finally(() => logger.endCollapsed(['[database.service] end']));
  }

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
