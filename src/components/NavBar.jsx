import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignOutButton } from '../api/useAuth.jsx';
import { NavigationLink } from './NavigationLink.jsx';
import { ButtonWithIcon } from './ButtonWithIcon.jsx';

export function NavBar({ user, lists, listPath }) {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const navigate = useNavigate();
	const onClickNavLink = () => {
		setIsNavOpen(false);
	};

	const onClickSignOut = () => {
		try {
			SignOutButton();
			setIsNavOpen(false);
			navigate('/');
			localStorage.clear();
		} catch (error) {
			console.log('error', error);
		}
	};

	const LogOutIcon = () => {
		return (
			<span className="pr-1.5 text-darkPurple">
				<i className="fa-solid fa-right-from-bracket fa-sm"></i>
			</span>
		);
	};
	return (
		<>
			{/* DESKTOP MENU */}
			<nav className="h-16 hidden lg:flex flex-row shadow-md justify-between items-center bg-offWhite text-darkPurple">
				<div className="h-full flex items-center pl-12">
					<h1 className="font-amiri text-2xl font-bold">Smart Shopping List</h1>
				</div>
				{!!user && (
					<div className="h-full flex flex-row items-center">
						<NavigationLink text={'All my lists'} destination={'/'} />

						{!!listPath && !!lists[0] && (
							<>
								<NavigationLink
									text={'List'}
									destination={`/list/${listPath}`}
								/>

								<NavigationLink
									text={'Manage List'}
									destination={'/manage-list'}
								/>
							</>
						)}
						<ButtonWithIcon
							text={'Sign out'}
							icon={<LogOutIcon />}
							handleClick={onClickSignOut}
						/>
					</div>
				)}
			</nav>

			<nav className="h-12 w-full flex flex-row justify-between lg:hidden relative shadow-md bg-offWhite">
				{/* MOBILE-MENU */}
				<div className="h-full flex items-center pl-12">
					<h1 className="font-amiri text-2xl font-bold">Smart Shopping List</h1>
				</div>
				{!!user && (
					<div className="flex items-center h-full pr-4">
						{/* HAMBURGER-ICON */}
						<button
							className="space-y-2"
							onClick={() => setIsNavOpen((prev) => !prev)}
						>
							<span className="block h-0.5 w-8 bg-darkPurple"></span>
							<span className="block h-0.5 w-8 bg-darkPurple"></span>
							<span className="block h-0.5 w-8 bg-darkPurple"></span>
						</button>

						<div
							className={
								isNavOpen
									? 'z-20 h-screen w-screen block absolute  bg-offWhite left-0 top-0'
									: 'hidden'
							}
						>
							{/* CROSS-ICON */}
							<button
								className="absolute top-0 right-0 px-8 py-8"
								onClick={() => setIsNavOpen(false)}
							>
								<span className="text-darkPurple">
									<i className="fa-solid fa-xmark"></i>
								</span>
							</button>
							{/* NAVIGATION-MOBILE-OPEN */}
							<div className="h-full flex flex-col pt-12 justify-center	items-center">
								<NavigationLink
									text={'All my lists'}
									destination={'/'}
									handleClick={onClickNavLink}
								/>

								{!!listPath && !!lists[0] && (
									<>
										<NavigationLink
											text={'List'}
											destination={`/list/${listPath}`}
											handleClick={onClickNavLink}
										/>

										<NavigationLink
											text={'Manage List'}
											destination={'/manage-list'}
											handleClick={onClickNavLink}
										/>
									</>
								)}
								<ButtonWithIcon
									text={'Sign out'}
									icon={<LogOutIcon />}
									handleClick={onClickSignOut}
								/>
							</div>
						</div>
					</div>
				)}
			</nav>
		</>
	);
}
