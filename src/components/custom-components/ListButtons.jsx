import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ListButtons = (props) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const buttonVariants = {
		purple:
			'text-base sm:text-lg text-offWhite flex items-center justify-center rounded-md bg-lightPurple transition ease-in-out hover:bg-hoverPurple',
		white:
			'text-base sm:text-lg text-darkPurple flex items-center justify-center  rounded-md bg-lightGrey border text-darkPurple transition ease-in-out hover:bg-hoverPurple hover:text-offWhite',
	};

	return (
		<div className="grid sm:grid-cols-3 grid-cols-2 gap-4 py-6 text-base sm:text-lg font-poppins">
			<button
				className={`sm:col-span-2  px-4 py-2 gap-6 shadow-lg ${buttonVariants[props.colorAdd]}`}
				onClick={() => navigate('/manage-list')}
			>
				<i className="fa-solid fa-plus"></i>

				<span>{t('AddItem')}</span>
			</button>
			<button
				className={`sm:col-span-1  gap-6 shadow-lg ${buttonVariants[props.colorShare]}`}
				onClick={() => navigate('/manage-list')}
			>
				<i className="fa-solid fa-share-nodes"></i>

				<span>{t('ShareList')}</span>
			</button>
		</div>
	);
};

export default ListButtons;
