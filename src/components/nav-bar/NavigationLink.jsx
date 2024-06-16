import { NavLink } from 'react-router-dom';

const NavigationLink = ({ text, destination, handleClick, icon }) => {
	return (
		<NavLink
			onClick={handleClick}
			to={destination}
			className={({ isActive }) =>
				[
					'flex flex-row lg:pr-12 lg:pt-0 pt-6 text-darkPurple font-poppins',
					isActive ? 'font-bold underline' : '',
				].join(' ')
			}
		>
			{icon}
			{text}
		</NavLink>
	);
};

export default NavigationLink;
