import { db, app } from '../firebase.config';
import {
  collection,
  getDocs,
  doc,
  query,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//============1. Save NEW food data to Firestore database================
const saveMenuDataToFirestore = async (foodData) => {
  try {
    const docRef = await addDoc(collection(db, 'menu'), foodData);
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    toast.error(error.message);
  }
};

//============2. Fetch saved food data from Firestore database================
const getMenuFromFirestore = async () => {
  const menuData = [];

  try {
    const docRef = await collection(db, 'menu');
    const queryData = query(docRef);
    const querySnap = await getDocs(queryData);
    console.log(querySnap);
    querySnap.forEach((doc) => {
      return menuData.push(doc.data());
    });
  } catch (error) {
    toast.error(error.message);
  }

  return menuData;
};
export { saveMenuDataToFirestore, getMenuFromFirestore };
