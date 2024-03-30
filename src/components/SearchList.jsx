import { useState } from 'react';

export const SearchList = ({ data, setNewList }) => {
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
			<label htmlFor="search">Search item</label>
			<input
				className="size-max"
				id="search"
				type="text"
				onChange={(e) => handleFiltering(e)}
				value={value}
			/>
			<button onClick={(e) => resetInput(e)} aria-label="clear search bar">
				x
			</button>
		</form>
	);
};

// export default SearchList;
