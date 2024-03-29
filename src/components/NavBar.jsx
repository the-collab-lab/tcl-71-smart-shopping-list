import { SignOutButton } from '../api/useAuth.jsx';
import { NavigationLink } from './NavigationLink.jsx';

export function NavBar({ user, lists, listPath }) {
	return (
		<nav className="h-16 flex flex-row bg-sky-500 justify-between items-center text-darkPurple">
			<div className="h-full flex items-center pl-12">
				<h1 className="font-amiri text-2xl font-bold">Smart shopping list</h1>
			</div>
			{!!user && (
				<div className="h'full flex flex-row">
					<NavigationLink text={'All my lists'} destination={'/'} />

					{!!listPath && !!lists[0] && (
						<>
							<NavigationLink text={'List'} destination={`/list/${listPath}`} />

							<NavigationLink
								text={'Manage List'}
								destination={'/manage-list'}
							/>
						</>
					)}
					<SignOutButton />
				</div>
			)}
		</nav>
	);
}
