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
		<form onSubmit={handleSubmit} className="flex gap-8 text-2xl">
			<input
				aria-label="Type a new list name"
				type="text"
				id="new list name"
				placeholder="Type a new list name"
				value={newList}
				onChange={(event) => handleInputChange(event)}
				onClick={(event) => handleKeyPressed(event)}
				className="grow bg-puurWhite border border-darkPurple rounded-md shadow-lg px-2 sm:px-6 py-4"
			/>
			<button
				type="submit"
				className="bg-lightRurple text-puurWhite flex justify-end shadow-lg rounded-md transition ease-in-out hover:bg-darkPurple px-4 sm:px-6 py-4 gap-6 shrink-0"
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
