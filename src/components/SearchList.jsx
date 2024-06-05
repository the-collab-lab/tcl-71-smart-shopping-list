import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SearchList = ({ data, setNewList }) => {
	const { t } = useTranslation();
	const [value, setValue] = useState('');

	const handleFiltering = (e) => {
		const userInput = e.target.value.toLowerCase();
		setValue(e.target.value);
		const gatherItem = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i]?.name.toLowerCase().includes(userInput)) {
				gatherItem.push(data[i]);
			}
		}
		setNewList(gatherItem);
	};

	const resetInput = (e) => {
		e.preventDefault();
		setValue('');
		setNewList(data);
	};

	return (
		<form>
			<div className="relative flex items-center ">
				<input
					className="bg-lightGrey border rounded-md col-span-1 w-full	shadow-lg font-poppins py-2 px-4 "
					id="search"
					type="text"
					onChange={(e) => handleFiltering(e)}
					value={value}
					aria-label="Search item"
					placeholder={t('SearchItem')}
				/>
				<button
					onClick={(e) => resetInput(e)}
					aria-label="clear the search bar"
					className="border text-darkPurple rounded-sm h-6 px-1  absolute end-5 flex items-center"
				>
					<i className="fa-solid fa-x"></i>
				</button>
			</div>
		</form>
	);
};

// export default SearchList;
