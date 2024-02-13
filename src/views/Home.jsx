import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { createList } from '../api';

export function Home({ data, setListPath, userId, userEmail }) {
	const [newList, setNewList] = useState('');
	const [message, setMessage] = useState('');

	console.log('data', data);
	// const checkIfListIsCreated = (newList) => {
	// 	if (data.some((item) => item.name === newList)) {
	// 		setMessage('List created');
	// 		console.log(message);
	// 	} else {
	// 		console.log('not working');
	// 	}
	// };

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await createList(userId, userEmail, newList);
			console.log('response', response);
			if (response) {
				console.log('response', response._key.path.segments[0]);

				setMessage('New list created');
				setListPath(response._key.path.segment[0]);
			}
		} catch (error) {
			if (error) {
				setMessage('There was an error creating the list');
			}
		}
		setNewList('');
	};
	const handleAddValue = (event) => {
		const data = event.target.value;
		setNewList(data);
	};
	const handleKeyPressed = (event) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="new list name">Name new list</label>
				<input
					type="text"
					id="new list name"
					value={newList}
					onChange={(event) => handleAddValue(event)}
					onClick={(event) => handleKeyPressed(event)}
				/>
				<button type="submit">Confirm list</button>
			</form>
			<span> {message ? <p> {message} </p> : <p></p>} </span>
			<ul>
				{data.map((list, i) => (
					<SingleList
						key={i}
						name={list.name}
						path={list.path}
						setListPath={setListPath}
					/>
				))}
			</ul>
		</div>
	);
}
