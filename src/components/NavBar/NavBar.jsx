import { useState } from 'react';
import NavBarContent from './NavBarContent';

export function NavBar({ user, lists, listPath }) {
	const [isNavOpen, setIsNavOpen] = useState(false);

	return (
		<>
			{/* DESKTOP MENU */}
			<nav className="h-16 hidden fixed z-20 w-full lg:flex shadow-md bg-offWhite text-darkPurple text-lg sm:text-xl">
				<div className="h-full w-full flex flex-row justify-between items-center xl:w-9/12 xl:mx-auto ">
					<div className="h-full flex items-center pl-12">
						<h2 className="font-amiri text-xl sm:text-2xl font-bold">
							Smart Shopping List
						</h2>
					</div>
					{!!user && (
						<div className="h-full flex flex-row items-center">
							<NavBarContent
								lists={lists}
								listPath={listPath}
								setIsNavOpen={setIsNavOpen}
							/>
						</div>
					)}
				</div>
			</nav>

			<nav className="h-12 w-full flex flex-row justify-between lg:hidden relative shadow-md text-darkPurple bg-offWhite text-lg sm:text-xl">
				{/* MOBILE-MENU */}
				<div className="h-full flex items-center pl-12">
					<h2 className="font-amiri text-xl sm:text-2xl font-bold">
						Smart Shopping List
					</h2>
				</div>
				{!!user && (
					<div className="flex items-center h-full pr-4">
						{/* HAMBURGER-ICON */}
						<button
							className="space-y-2"
							onClick={() => setIsNavOpen((prev) => !prev)}
							alt="toggle menu"
						>
							<span className="block  w-8 text-darkPurple">
								<i className="fa-solid fa-bars"></i>
							</span>
						</button>

						<div
							className={
								isNavOpen
									? 'z-20 h-screen w-screen block absolute text-darkPurple bg-offWhite left-0 top-0'
									: 'hidden'
							}
						>
							{/* CROSS-ICON */}
							<button
								className="absolute top-0 right-0 px-8 py-8"
								onClick={() => setIsNavOpen(false)}
								alt="close menu"
							>
								<span className="text-darkPurple">
									<i className="fa-solid fa-xmark"></i>
								</span>
							</button>
							{/* NAVIGATION-MOBILE-OPEN */}
							<div className="h-full flex flex-col justify-center	items-center">
								<NavBarContent
									lists={lists}
									listPath={listPath}
									setIsNavOpen={setIsNavOpen}
								/>
							</div>
						</div>
					</div>
				)}
			</nav>
		</>
	);
}
