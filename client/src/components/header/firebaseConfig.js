import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAV_mblQgUTfZr3MLDva6bXul_bTBj2-tQ",
  authDomain: "doccase-89ae1.firebaseapp.com",
  projectId: "doccase-89ae1",
  storageBucket: "doccase-89ae1.appspot.com",
  messagingSenderId: "343914103022",
  appId: "1:343914103022:web:d9626779002e48623af3ff"
};


const app = initializeApp(firebaseConfig);


export const storage = getStorage(app)