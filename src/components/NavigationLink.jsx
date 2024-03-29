import { NavLink } from 'react-router-dom';

export function NavigationLink({ text, destination, handleClick, icon }) {
	return (
		<NavLink
			onClick={handleClick}
			to={destination}
			className={({ isActive }) =>
				[
					'flex flex-row pr-12 font-poppins text-lg',
					isActive ? 'font-bold underline' : '',
				].join(' ')
			}
		>
			{icon}
			{text}
		</NavLink>
	);
}
