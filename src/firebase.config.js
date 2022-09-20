import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDRTChuPv4LM72IeuL-62oifekcPE8JPL8',
  authDomain: 'foody-app-8c4bc.firebaseapp.com',
  projectId: 'foody-app-8c4bc',
  storageBucket: 'foody-app-8c4bc.appspot.com',
  messagingSenderId: '1021953085996',
  appId: '1:1021953085996:web:7a779cbb28a32c42df7789',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
