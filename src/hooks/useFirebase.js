import { db, app } from '../firebase.config';
import { collection, getDocs, doc, query, updateDoc, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

//============1. Save NEW food data to Firestore database================
const saveDataToFirestore = async (collectionName, dataObj) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), dataObj);
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    toast.error(error.message);
  }
};

//============2. Fetch saved food data from Firestore database================
const getDataFromFirestore = async (collectionName) => {
  const data = [];

  try {
    const docRef = await collection(db, collectionName);
    const queryData = query(docRef);
    const querySnap = await getDocs(queryData);
    querySnap.forEach((doc) => {
      return data.push(doc.data());
    });
  } catch (error) {
    toast.error(error.message);
  }

  return data;
};
export { saveDataToFirestore, getDataFromFirestore };
