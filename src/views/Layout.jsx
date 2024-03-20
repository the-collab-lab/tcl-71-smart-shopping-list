import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { auth } from '../api/config.js';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';

export function Layout({ listPath }) {
	const { user } = useAuth();

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
					<p>{user?.displayName ? `Welcome ${user?.displayName}` : null}</p>
					{!!user ? <SignOutButton /> : <SignInButton />}
				</header>
				<main className="Layout-main">
					{!!user ? (
						<Outlet />
					) : (
						<h3>Log in to start using the shopping list app</h3>
					)}
				</main>
				{!!user && (
					<nav className="Nav">
						<div className="Nav-container">
							<NavLink to="/" className="Nav-link">
								Home
							</NavLink>
							{listPath && (
								<>
									<NavLink to={`/list/${listPath}`} className="Nav-link">
										List
									</NavLink>
									<NavLink to="/manage-list" className="Nav-link">
										Manage List
									</NavLink>
								</>
							)}
						</div>
					</nav>
				)}
			</div>
		</>
	);
}
