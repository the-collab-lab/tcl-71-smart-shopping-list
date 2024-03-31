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
		<div className="h-dvh flex flex-col text-poppins">
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
			<main className="Layout-main">{!!user ? <Outlet /> : null}</main>
			<footer className="w-full fixed bottom-0 lg:flex bg-offWhite text-darkPurple p-4 font-poppins text-xl">
				<span>
					<a
						href="https://github.com/the-collab-lab/tcl-71-smart-shopping-list/tree/main"
						className="ps-8"
						aria-label="Source code on GitHub"
						target="blank"
					>
						<i className="fa-brands fa-github pe-2"></i>
					</a>
					Built by{' '}
					<a href="https://www.linkedin.com/in/borjamarticalvo/" target="blank">
						Borja
					</a>
					,{' '}
					<a
						href="https://www.linkedin.com/in/celinelecorvaisier/"
						target="blank"
					>
						Céline
					</a>
					,{' '}
					<a
						href="https://www.linkedin.com/in/judith-kraziewicz/"
						target="blank"
					>
						Judith
					</a>{' '}
					and{' '}
					<a href="https://www.linkedin.com/in/viviana-yanez/" target="blank">
						Viviana
					</a>
				</span>
			</footer>
		</div>
	);
}
