import { Outlet } from 'react-router-dom';
import { SignIn } from '../api/useAuth.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import Groceries from '../assets/groceries.png';
import Loading from '../components/Loading.jsx';

export function Layout({ lists, listPath, user, isLoadingUser }) {
	const handleClickSignIn = () => {
		SignIn();
	};

	return (
		<div className="w-screen flex flex-col text-poppins min-w-96 bg-puurWhite">
			<NavBar user={user} lists={lists} listPath={listPath} />
			<main className="min-h-screen w-full lg:pt-16 xl:w-9/12  xl:mx-auto">
				{isLoadingUser ? (
					<Loading />
				) : !!user ? (
					<Outlet />
				) : (
					<div className="flex flex-col justify-items-center	pt-12 lg:justify-between lg:m-20 lg:pt-0 lg:flex-row">
						<div className="lg:w-fit flex flex-col items-center">
							<h1 className="max-w-sm font-amiri text-3xl sm:text-4xl text-darkPurple leading-[3rem] sm:leading-[3rem]">
								Simplify your shopping with{' '}
								<span className="font-semibold">SmartShoppingList</span>, the
								intuitive list organizer.
							</h1>
							<button
								className="w-80 mt-8 p-2 rounded-md font-poppins text-base sm:text-lg  text-puurWhite bg-lightPurple"
								type="button"
								onClick={handleClickSignIn}
							>
								Sign in to start
							</button>
						</div>
						<div className="hidden lg:flex w-5/12 pt-10 ">
							<img
								src={Groceries}
								width={400}
								height={400}
								alt="Illustration of a person with a shopping cart holding a fruit with one hand and a mobile with an open shopping app in the background"
							/>
						</div>
					</div>
				)}
			</main>
			<footer className="w-full fixed bottom-0  bg-offWhite text-darkPurple p-4 font-poppins text-lg sm:text-xl">
				<div className="ps-8">
					<a
						href="https://github.com/the-collab-lab/tcl-71-smart-shopping-list/tree/main"
						aria-label="Source code on GitHub"
						target="blank"
					>
						<i className="fa-brands fa-github pe-2"></i>
					</a>
					Built by&nbsp;
					<span>
						<a
							href="https://www.linkedin.com/in/borjamarticalvo/"
							target="blank"
							className=" hover:underline"
						>
							Borja
						</a>
						,&nbsp;
						<a
							href="https://www.linkedin.com/in/celinelecorvaisier/"
							target="blank"
							className=" hover:underline"
						>
							Céline
						</a>
						,&nbsp;
						<a
							href="https://www.linkedin.com/in/judith-kraziewicz/"
							target="blank"
							className=" hover:underline"
						>
							Judith
						</a>
						&nbsp; and &nbsp;
						<a
							href="https://www.linkedin.com/in/viviana-yanez/"
							target="blank"
							className=" hover:underline"
						>
							Viviana
						</a>
					</span>
				</div>
			</footer>
		</div>
	);
}
