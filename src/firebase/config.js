import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCQrWtvWaaoE-VLDjzonCtkzCLB4VBHCbM',
  authDomain: 'sales-pipeline-demo.firebaseapp.com',
  projectId: 'sales-pipeline-demo',
  storageBucket: 'sales-pipeline-demo.appspot.com',
  messagingSenderId: '375077929264',
  appId: '1:375077929264:web:4e5e09e982f175bd1ac8f5',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
