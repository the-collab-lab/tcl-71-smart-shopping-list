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
		<div className="min-h-dvh w-screen xl:w-9/12 flex flex-col m-auto text-poppins relative">
			<NavBar user={user} lists={lists} listPath={listPath} />
			<main className="h-full w-full pb-4">
				{!!user ? (
					<Outlet />
				) : (
					<div className="h-full w-full flex justify-center pt-10 lg:pt-0 lg:flex-row ">
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
						<div className="hidden lg:flex lg:w-5/12 right-10 bottom-10 absolute justify-end justify-end ">
							<img src={Groceries} width={400} height={400} alt="groceries" />
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
