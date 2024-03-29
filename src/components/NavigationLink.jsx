import { NavLink } from 'react-router-dom';

export function NavigationLink({ text, destination }) {
	return (
		<NavLink
			to={destination}
			className={({ isActive }) =>
				[
					'pr-12 font-poppins text-lg',
					isActive ? 'font-bold underline' : '',
				].join(' ')
			}
		>
			{text}
		</NavLink>
	);
}
