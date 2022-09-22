const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

// exports.onUserCreate = functions.firestore
//   .document('users/{userId}')
//   .onCreate(async (snapshot, context) => {
//     const { userId } = context.params;
//     console.log(userId, '=====', snapshot.data().email);
//   });
// exports.onUpdate = functions.firestore
//   .document('menu/{userId}')
//   .onUpdate(async (change, context) => {
//     const newValue = change.after.data();
//     const previousValue = change.before.data();

//     console.log(newValue);
//     console.log(previousValue.email);
//   });

// exports.deleteUser = functions.firestore
//   .document('users/{userID}')
//   .onDelete((snap, context) => {
//     // Get an object representing the document prior to deletion
//     // e.g. {'name': 'Marie', 'age': 66}
//     const deletedValue = snap.data();
//     console.log(deletedValue);
//   });

// exports.modifyUser = functions.firestore
//   .document('users/{userID}')
//   .onWrite((change, context) => {
//     // Get an object with the current document value.
//     // If the document does not exist, it has been deleted.
//     const document = change.after.exists ? change.after.data() : null;

//     // Get an object with the previous document value (for update or delete)
//     const oldDocument = change.before.data();

//     console.log(document);
//     // perform desired operations ...
//   });

exports.onWritten = functions.firestore
  .document('menu/{userID}')
  .onWrite((change, context) => {
    // Get an object with the current document value.
    // If the document does not exist, it has been deleted.
    const document = change.after.exists ? change.after.data() : null;

    // Get an object with the previous document value (for update or delete)
    // const oldDocument = change.before.data();

    // console.log(document); //{name:Ganzo} object irne.
    console.log('user id ni:', context.params.userID); //id ni irne.
  });
