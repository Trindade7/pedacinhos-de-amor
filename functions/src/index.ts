import * as fbAdmin from 'firebase-admin';
import * as functions from 'firebase-functions';

fbAdmin.initializeApp();

// TODO: Write tests, specially for nagative numbers
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
            let productPrice = 0;

            if (change.after.exists && !change.before.exists) { //on create
                console.log('Adding', change.after?.data());

                const item = { ...change.after?.data() };
                quantityIncrement = Math.abs(item[quantityFieldName]); //! remove abs
                productPrice = item['product']['price'];
            }
            else if (!change.after.exists && change.before.exists) { //on delete
                console.log('removing', change.before?.data());
                const item = { ...change.before?.data() };

                quantityIncrement = - Math.abs(item[quantityFieldName]);
                productPrice = item['product']['price'];
            }
            else { //on update
                console.log('Adding', change.after?.data());
                const quantityBefore = { ...change.before?.data() }[quantityFieldName];
                const quantityAfter = { ...change.after?.data() }[quantityFieldName];
                productPrice = { ...change.before?.data() }['product']['price'];

                quantityIncrement = quantityAfter - quantityBefore;
            }
            // Return the promise from countRef.transaction() so our function
            // waits for this async event to complete before it exits.
            const currentBasket = (await basketRef.get()).data() ?? { totalQuantity: 0, totalPrice: 0 };

            currentBasket['totalItems'] = (currentBasket['totalItems'] ?? 0) + quantityIncrement;
            currentBasket['totalPrice'] = (currentBasket['totalPrice'] ?? 0) + quantityIncrement * productPrice;

            await basketRef.set(currentBasket, { merge: true });

            console.log(
                'Counters updated. added =>\n',
                { quantityIncrement },
                { productPrice },
                { currentBasket }
            );
            return null;
        });
