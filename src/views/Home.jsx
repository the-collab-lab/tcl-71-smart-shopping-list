import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { createList } from '../api';

export function Home({ data, setListPath, userId, userEmail }) {
	const [newList, setNewList] = useState('');
	const [message, setMessage] = useState('');

	const checkIfListIsCreated = (newList) => {
		if (data.some((item) => item.name === newList)) {
			setMessage('List created');
			console.log(message);
		} else {
			console.log('not working');
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(data);
		try {
			await createList(userId, userEmail, newList);
			checkIfListIsCreated(newList);
		} catch (error) {
			if (error) {
				setMessage('There was an error creating the list');
				console.log(message);
			}
		}
		setNewList('');
		console.log(data);
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
