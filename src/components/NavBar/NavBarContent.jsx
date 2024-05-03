import { useTranslation } from 'react-i18next';
import { SignOut } from '../../api/useAuth.jsx';
import { NavigationLink } from './NavigationLink.jsx';
import { useNavigate } from 'react-router-dom';
import { ButtonWithIcon } from '../ButtonWithIcon.jsx';

export default function NavLinks({ listPath, lists, setIsNavOpen }) {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const onClickNavLink = () => {
		setIsNavOpen(false);
	};

	const onClickSignOut = () => {
		try {
			SignOut();
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
				text={t('AllMyLists')}
				destination={'/'}
				handleClick={onClickNavLink}
			/>

			{!!listPath && !!lists[0] && (
				<>
					<NavigationLink
						text={t('NavbarList')}
						destination={`/list/${listPath}`}
						handleClick={onClickNavLink}
					/>

					<NavigationLink
						text={t('NavbarManageList')}
						destination={'/manage-list'}
						handleClick={onClickNavLink}
					/>
				</>
			)}
			<ButtonWithIcon
				text={t('NavbarSignOut')}
				icon={<LogOutIcon />}
				handleClick={onClickSignOut}
			/>
		</>
	);
}
