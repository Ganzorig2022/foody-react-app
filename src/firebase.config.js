import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: 'foody-app-8c4bc.firebaseapp.com',
  projectId: 'foody-app-8c4bc',
  storageBucket: 'foody-app-8c4bc.appspot.com',
  messagingSenderId: '1021953085996',
  appId: '1:1021953085996:web:7a779cbb28a32c42df7789',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

// if (location.hostname === 'localhost') {
//   db.useEmulator('localhost', 8080);
//   auth.useEmulator('http://localhost:8080/', { disableWarnings: true });
// }
// const emulator = connectFirestoreEmulator(db, 'localhost', 8080);
export { db, app };
