import { NavLink } from 'react-router-dom';

export function NavigationLink({ text, destination, handleClick, icon }) {
	return (
		<NavLink
			onClick={handleClick}
			to={destination}
			className={({ isActive }) =>
				[
					'flex flex-row lg:pr-12 lg:pt-0 pt-6 text-darkPurple font-poppins text-lg',
					isActive ? 'font-bold underline' : '',
				].join(' ')
			}
		>
			{icon}
			{text}
		</NavLink>
	);
}
