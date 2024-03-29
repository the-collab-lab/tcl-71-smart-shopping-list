import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';

export function Layout({ lists, listPath }) {
	const { user } = useAuth();

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					{/* Example how to use the font families and the colors with tailwindCSS */}
					<h1 className="font-amiru text-alertRed">Smart shopping list</h1>
					{/* example how to use awesome font. To style the icon, wrap it around a span and use tailwindCSS */}
					<span className="text-alertRed">
						<i className="fa-solid fa-trash"></i>
						<i class="fa-solid fa-share-nodes"></i>
						<i class="fa-solid fa-right-from-bracket"></i>
						<i class="fa-solid fa-plus"></i>
						<i class="fa-solid fa-xmark"></i>
					</span>

					{!!user ? (
						<>
							<p>{`Welcome ${user?.displayName}`}</p>
							<SignOutButton />
						</>
					) : (
						<>
							<h3>Log in to begin using the shopping list app</h3>
							<SignInButton />
						</>
					)}
				</header>
				<main className="Layout-main">{!!user ? <Outlet /> : null}</main>
				{!!user && (
					<nav className="Nav">
						<div className="Nav-container">
							<NavLink to="/" className="Nav-link">
								Home
							</NavLink>
							{!!listPath && !!lists[0] && (
								<>
									<NavLink to={`/list/${listPath}`} className="Nav-link">
										List
									</NavLink>
									<NavLink to="/manage-list" className="Nav-link">
										Manage List
									</NavLink>
								</>
							)}
							<SignOutButton />
						</div>
					</nav>
				)}
			</div>
		</>
	);
}
