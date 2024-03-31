import { Outlet } from 'react-router-dom';
import { auth } from '../api/config.js';
import { SignIn, useAuth } from '../api/useAuth.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import Groceries from '../assets/groceries.png';

export function Layout({ lists, listPath }) {
	const { user } = useAuth();

	const handleClickSignIn = () => {
		SignIn();
	};

	return (
		<div className="h-dvh max-w-screen flex flex-col text-poppins ">
			<NavBar user={user} lists={lists} listPath={listPath} />
			<main className="h-full w-full lg:pt-16  pb-4 xl:w-9/12  xl:mx-auto">
				{!!user ? (
					<Outlet />
				) : (
					<div className="h-full w-full flex justify-center pt-10 lg:pt-0 lg:flex-row relative">
						<div className="lg:w-fit flex flex-col items-center	 lg:top-36 lg:left-44 lg:absolute">
							<h3 className="w-96 font-amiri text-4xl text-darkPurple leading-[3.5rem]	">
								Simplify your shopping with{' '}
								<span className="font-semibold">SmartShoppingList</span>, the
								intuitive list organizer.
							</h3>
							<button
								className="w-80 mt-8 p-2 rounded-md font-poppins text-lg  text-puurWhite bg-lightPurple"
								type="button"
								onClick={handleClickSignIn}
							>
								Sign in to start
							</button>
						</div>
						<div className="hidden lg:flex w-5/12 right-10 bottom-10 absolute justify-end justify-end ">
							<img src={Groceries} width={400} height={400} alt="groceries" />
						</div>
					</div>
				)}
			</main>
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
