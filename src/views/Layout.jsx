import { Outlet } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { SignIn, useAuth } from '../api/useAuth.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';

export function Layout({ lists, listPath }) {
	const { user } = useAuth();

	const handleClickSignIn = () => {
		SignIn();
	};

	return (
		<div className="h-dvh flex flex-col text-poppins align-center">
			<NavBar user={user} lists={lists} listPath={listPath} />
			<header className="Layout-header">
				{/* Example how to use the font families and the colors with tailwindCSS */}
				{/* example how to use awesome font. To style the icon, wrap it around a span and use tailwindCSS */}
				<span className="text-alertRed">
					<i className="fa-solid fa-trash"></i>
					<i className="fa-solid fa-share-nodes"></i>
					<i className="fa-solid fa-plus"></i>
					<i className="fa-solid fa-xmark"></i>
				</span>

				{!!user ? (
					<>
						<p>{`Welcome ${user?.displayName}`}</p>
					</>
				) : (
					<>
						<h3>Log in to begin using the shopping list app</h3>
						<button
							className="font-poppins text-lg"
							type="button"
							onClick={handleClickSignIn}
						>
							Sign In
						</button>
						{/* <SignInButton /> */}
					</>
				)}
			</header>
			<main className="Layout-main  w-3/4">{!!user ? <Outlet /> : null}</main>
		</div>
	);
}
