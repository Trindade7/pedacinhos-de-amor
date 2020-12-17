import * as fbAdmin from 'firebase-admin';
import * as functions from 'firebase-functions';

fbAdmin.initializeApp();

exports.countBasketTotals = functions.firestore
    .document('/users/{usetId}/content/basket/items/{itemId}').onWrite(
        async (change, context) => {
            const basketRef = change.after.ref.parent.parent;
            const quantityFieldName = 'quantity';

            if (!basketRef) {
                console.log('No basket reference');
                return;
            }

            let quantityIncrement: number;

            if (change.after.exists && !change.before.exists) { //on create
                console.log('Adding', change.after?.data());

                const item = { ...change.after?.data() };
                quantityIncrement = Math.abs(item[quantityFieldName]);
            }
            else if (!change.after.exists && change.before.exists) { //on delete
                console.log('Adding', change.after?.data());
                const item = { ...change.before?.data() };
                quantityIncrement = - Math.abs(item[quantityFieldName]);
            }
            else { //on update
                console.log('Adding', change.after?.data());
                const quantityBefore = { ...change.before?.data() }[quantityFieldName];
                const quantityAfter = { ...change.after?.data() }[quantityFieldName];

                quantityIncrement = quantityAfter - quantityBefore;
            }

            // Return the promise from countRef.transaction() so our function
            // waits for this async event to complete before it exits.
            const currentBasket = (await basketRef.get()).data() ?? { totalQuantity: 0, totalPrice: 0 };
            currentBasket['totalQuantity'] = (currentBasket['totalQuantity'] ?? 0) + quantityIncrement;

            await basketRef.set(currentBasket, { merge: true });

            console.log(
                'Counters updated. added =>\n',
                { quantityIncrement },
                { currentBasket }
            );
            return null;
        });
