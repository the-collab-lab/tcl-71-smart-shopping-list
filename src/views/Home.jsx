import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { createList } from '../api';

export function Home({ data, setListPath }) {
	const [newList, setNewList] = useState('');

	const handleSubmit = () => {
		console.log('submitted');
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
