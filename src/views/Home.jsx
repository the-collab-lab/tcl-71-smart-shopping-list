import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { createList } from '../api';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath, userId, userEmail }) {
	const [newList, setNewList] = useState('');
	const [message, setMessage] = useState(null);

	const navigate = useNavigate();
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
				console.log('response', typeof response._key.path.segments[0]);

				setMessage('New list created');
				setListPath(
					`${response._key.path.segments[0]}/${response._key.path.segments[1]}`,
				);
				navigate('/list');
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
					onChange={(event) => handleInputChange(event)}
					onClick={(event) => handleKeyPressed(event)}
				/>
				<button type="submit">Confirm list</button>
			</form>
			<span> {message ? <p> {message} </p> : <></>} </span>
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
