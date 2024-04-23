import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDk7NjVgD07csrGxjM32jiqYM4uDm6i8SM',
	authDomain: 'despiensa-94998.firebaseapp.com',
	projectId: 'despiensa-94998',
	storageBucket: 'despiensa-94998.appspot.com',
	messagingSenderId: '264773944931',
	appId: '1:264773944931:web:a9b6343468cf30c491da56',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
