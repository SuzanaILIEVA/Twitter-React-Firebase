// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKAfiGRdQuzRMoWz0nAH2qlU8TA0eosws",
  authDomain: "twitter-clone-e3718.firebaseapp.com",
  projectId: "twitter-clone-e3718",
  storageBucket: "twitter-clone-e3718.appspot.com",
  messagingSenderId: "52820840220",
  appId: "1:52820840220:web:5cf8b4c5759100647a34d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth : kimlik dogrulama yapisinin referansini al 
export const auth = getAuth(app)

//google provider kurulumu 
export const provider = new GoogleAuthProvider()


// veri tabani referansini alma
export const db =  getFirestore(app)

//storage referansini alma 
export const storage = getStorage(app)
