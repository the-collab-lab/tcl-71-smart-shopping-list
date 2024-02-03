import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCnrz0zhsT7mih_K6t67dT2K6a5wcNaLzY',
	authDomain: 'tcl-71-smart-shopping-list.firebaseapp.com',
	databaseURL: 'FILL_ME_IN',
	projectId: 'tcl-71-smart-shopping-list',
	storageBucket: 'tcl-71-smart-shopping-list.appspot.com',
	messagingSenderId: '200403710630',
	appId: '1:200403710630:web:1af41c1300a8751bde3a67',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
