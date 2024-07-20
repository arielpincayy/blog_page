import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDN6uNi1N0pUkAjcS2RaQechp-bVPJBmWw",
  authDomain: "myownnotesuwu.firebaseapp.com",
  projectId: "myownnotesuwu",
  storageBucket: "myownnotesuwu.appspot.com",
  messagingSenderId: "287095150187",
  appId: "1:287095150187:web:d40bcc8ff453a7effc432e",
  measurementId: "G-TK0CQJZ72S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

function uploadImg(message4:string, name_img:string){
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `blog_images/${name_img}.jpg`);
    
    uploadString(storageRef, message4, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
      
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL);
      }).catch((error) => {
        console.error('Error getting download URL', error);
        reject(error);
      });
    }).catch((error) => {
      console.error('Error uploading the file', error);
      reject(error);
    });
  });
}

export {app, auth, GoogleAuthProvider, signInWithPopup, uploadImg};

