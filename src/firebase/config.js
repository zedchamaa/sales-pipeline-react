import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/app-check'

const firebaseConfig = {
  apiKey: 'AIzaSyCQrWtvWaaoE-VLDjzonCtkzCLB4VBHCbM',
  authDomain: 'sales-pipeline-demo.firebaseapp.com',
  projectId: 'sales-pipeline-demo',
  storageBucket: 'sales-pipeline-demo.appspot.com',
  messagingSenderId: '375077929264',
  appId: '1:375077929264:web:4e5e09e982f175bd1ac8f5',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

// firebase app check
const appCheck = firebase.appCheck()
// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
appCheck.activate(
  '6LcDW40kAAAAAHzOVH9lFNLgJStqwaOcqqiFaPE2',

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  true
)

export { projectFirestore, projectAuth, timestamp }
