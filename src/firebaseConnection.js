import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'; //autenticação de usuario

const firebaseConfig = {
    apiKey: "AIzaSyAqq-xZbWvTGY5GqrAWpz-HTQv9PbJuVxA",
    authDomain: "curso-react-22f5a.firebaseapp.com",
    projectId: "curso-react-22f5a",
    storageBucket: "curso-react-22f5a.appspot.com",
    messagingSenderId: "438922639095",
    appId: "1:438922639095:web:7566308efc0d55be5d85f2",
    measurementId: "G-WW6K9K8KF8"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {db, auth};