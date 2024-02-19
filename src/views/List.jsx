import { useState, useEffect } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [value, setValue] = useState('');
	const [newList, setNewList] = useState([]);

	useEffect(() => {
		setNewList(data);
	}, [data]);

	const handlefiltering = (e) => {
		const userinput = e.target.value.toLowerCase();
		setValue(e.target.value);
		let gatherItem = [];
		for (let i = 0; i < data.length; i++) {
			console.log('data[i].name', data[i]?.name);
			if (data[i]?.name.toLowerCase().includes(userinput)) {
				gatherItem.push(data[i]);
			}
		}
		setNewList(gatherItem);
	};

	const resetInput = (e) => {
		e.preventDefault();

		setValue('');
	};

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
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
			<div>
				{newList?.length === 0 ? (
					<></>
				) : (
					<ul>
						{newList?.map((item) => (
							<ListItem key={item.id} name={item.name} />
						))}
					</ul>
				)}
			</div>
		</>
	);
}
