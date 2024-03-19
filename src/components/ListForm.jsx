import { useState } from 'react';
import { createList } from '../api';
import { useNavigate } from 'react-router-dom';
import { inputHasValue } from '../utils/inputValidation';
import { stringsHaveSameValue } from '../utils/inputValidation';
//import { db } from '../api/config';

const ListForm = (props) => {
	const { setMessage, setListPath, userId, userEmail } = props;
	const [newList, setNewList] = useState('');
	const navigate = useNavigate();

	/*
	Idea being that the new list is being stored in a variable
	getting the lists from the database as an array and loop through

	const compare = [db] -- tried to look it up and failed on that;
	console.log(createdList, compare)

	for (let i = 0; i < db.length; i++){
		if (stringsHaveSameValue(newList,db[i])){
			setMessage('A List with this name already exists');
			setNewList('');
			break;
		}
	}

	I am hoping my idea being clear here - obviously if the list name
	isn't a duplicate, the loop will run from start to finish.

	Maybe there is a nicer way.
	*/

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!inputHasValue(newList)) {
			setMessage('Please type a list name :)');
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
		<form onSubmit={handleSubmit}>
			<label htmlFor="new list name">Name new list</label>
			<input
				type="text"
				id="new list name"
				value={newList}
				onChange={(event) => handleInputChange(event)}
				onClick={(event) => handleKeyPressed(event)}
			/>
			<button type="submit">Create list</button>
		</form>
	);
};

export default ListForm;
