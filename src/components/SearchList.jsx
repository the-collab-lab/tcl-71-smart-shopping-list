import { useState } from 'react';

const SearchList = ({ data, setNewList }) => {
	const [value, setValue] = useState('');

	const handlefiltering = (e) => {
		const userinput = e.target.value.toLowerCase();
		setValue(e.target.value);
		const gatherItem = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i]?.name.toLowerCase().includes(userinput)) {
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
				id="search"
				type="text"
				onChange={(e) => handlefiltering(e)}
				value={value}
			/>
			<button onClick={(e) => resetInput(e)} aria-label="clear search bar">
				x
			</button>
		</form>
	);
};

export default SearchList;
