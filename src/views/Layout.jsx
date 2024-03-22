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
					<h1>Smart shopping list</h1>

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
