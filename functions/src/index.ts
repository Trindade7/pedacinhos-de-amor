import * as functions from 'firebase-functions';
import * as fbAdmin } from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

// const admin = fbAdmin.initializeApp();

export const makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        // Grab the current value of what was written to Cloud Firestore.
        const original = snap.data().original;

        // Access the parameter `{documentId}` with `context.params`
        functions.logger.log('Uppercasing', context.params.documentId, original);

        const uppercase = original.toUpperCase();

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to Cloud Firestore.
        // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
        return snap.ref.set({ uppercase }, { merge: true });
    });