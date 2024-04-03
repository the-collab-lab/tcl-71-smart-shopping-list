import { useNavigate } from 'react-router-dom';
const ListButtons = (props) => {
	const navigate = useNavigate();

	const buttonVariants = {
		purple: 'flex items-center justify-center rounded-lg bg-lightPurple',
		white:
			'flex items-center justify-center rounded-lg bg-white border text-darkPurple',
	};

	const iconVariants = {
		purple: 'fa-inverse',
		white: '',
	};

	const textVariants = {
		purple: 'ps-2 text-offWhite font-poppins',
		white: 'ps-2 text-darkPurple font-poppins',
	};

	return (
		<div className="grid sm:grid-cols-3 grid-cols-2 gap-x-2 py-6 text-base sm:text-lg">
			<button
				className={`sm:col-span-2  py-5 ${buttonVariants[props.colorAdd]}`}
				onClick={() => navigate('/manage-list')}
			>
				<i className={`${iconVariants[props.colorAdd]} fa-solid fa-plus `}></i>

				<span className={`${textVariants[props.colorAdd]}`}>Add item</span>
			</button>
			<button
				className={`sm:col-span-1  ${buttonVariants[props.colorShare]}`}
				onClick={() => navigate('/manage-list')}
			>
				<i
					className={`${iconVariants[props.colorShare]} fa-solid fa-share-nodes`}
				></i>

				<span className={`${textVariants[props.colorShare]}`}>Share list</span>
			</button>
		</div>
	);
};

export default ListButtons;
