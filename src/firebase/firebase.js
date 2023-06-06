import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC9zv9l9RqtbmrKF9n1ttXP2V_U3EHom4U',
  authDomain: 'my-dream-d7961.firebaseapp.com',
  projectId: 'my-dream-d7961',
  storageBucket: 'my-dream-d7961.appspot.com',
  messagingSenderId: '695185490084',
  appId: '1:695185490084:web:5f0de35a1cf780c3eaa631',
  measurementId: 'G-L8VLMVRNQZ',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export default auth;
