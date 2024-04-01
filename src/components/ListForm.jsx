import { useState } from 'react';
import { createList } from '../api';
import { useNavigate } from 'react-router-dom';
import { inputHasValue } from '../utils/inputValidation';
import { stringsHaveSameValue } from '../utils/inputValidation';

const ListForm = (props) => {
	const { setMessage, setListPath, userId, userEmail, data } = props;
	const [newList, setNewList] = useState('');
	const navigate = useNavigate();

	const checkNameNewList = (newList) => {
		if (data.some((item) => stringsHaveSameValue(newList, item.name))) {
			return true;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!inputHasValue(newList)) {
			setMessage('Please type a list name :)');
			setNewList('');
			return;
		}
		if (checkNameNewList(newList)) {
			setMessage('A List with this name already exists');
			setNewList('');
			return;
		}

		try {
			const response = await createList(userId, userEmail, newList);
			if (response) {
				setListPath(
					`${response._key.path.segments[0]}/${response._key.path.segments[1]}`,
				);
				navigate(
					`/list/${response._key.path.segments[0]}/${response._key.path.segments[1]}`,
				);
			}
		} catch (error) {
			if (error) {
				setMessage('There was an error creating the list');
			}
		}
		setNewList('');
	};

	const handleInputChange = (event) => {
		const data = event.target.value;
		setNewList(data);
		setMessage(null);
	};
	const handleKeyPressed = (event) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col sm:flex-row gap-4 text-base sm:text-lg"
		>
			<input
				aria-label="Type a new list name"
				type="text"
				id="new list name"
				placeholder="Type a new list name"
				value={newList}
				onChange={(event) => handleInputChange(event)}
				onClick={(event) => handleKeyPressed(event)}
				className="grow shrink bg-puurWhite border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple"
			/>
			<button
				type="submit"
				className="bg-lightPurple text-puurWhite flex justify-center shadow-lg rounded-md transition ease-in-out hover:bg-hoverPurple px-4 py-2 gap-6 shrink-0"
			>
				<div>
					<i className="fa-solid fa-plus"></i>
				</div>
				Create List
			</button>
		</form>
	);
};

export default ListForm;
