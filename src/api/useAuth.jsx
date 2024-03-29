import { useEffect, useState } from 'react';
import { auth } from './config.js';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { addUserToDatabase } from './firebase.js';

/**
 * A button that signs the user in using Google OAuth. When clicked,
 * the button redirects the user to the Google OAuth sign-in page.
 * After the user signs in, they are redirected back to the app.
 */
export const SignInButton = () => (
	<button
		className="font-poppins text-lg"
		type="button"
		onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
	>
		Sign In
	</button>
);

/**
 * A button that signs the user out of the app using Firebase Auth.
 */
export const SignOutButton = () => (
	<button
		className="pr-12 font-poppins text-lg"
		type="button"
		onClick={() => {
			auth.signOut();
			localStorage.clear();
		}}
	>
		<span className="pr-1.5">
			<i className="fa-solid fa-right-from-bracket fa-sm"></i>
		</span>
		Sign Out
	</button>
);

/**
 * A custom hook that listens for changes to the user's auth state.
 * Check out the Firebase docs for more info on auth listeners:
 * @see https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
export const useAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user);
			if (user) {
				addUserToDatabase(user);
			}
		});
	}, []);

	return { user };
};
