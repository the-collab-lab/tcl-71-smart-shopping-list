import { SignOutButton } from '../api/useAuth.jsx';
import { NavigationLink } from './NavigationLink.jsx';
import { useNavigate } from 'react-router-dom';
import { ButtonWithIcon } from './ButtonWithIcon.jsx';

export default function NavLinks({ listPath, lists, setIsNavOpen }) {
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
		</>
	);
}
