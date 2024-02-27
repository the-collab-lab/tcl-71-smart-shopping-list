import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import SearchList from '../components/SearchList';
import { useParams } from 'react-router-dom';
import { updateItem } from '../api/firebase';

export function List({ data, listPath }) {
	const [newList, setNewList] = useState([]);
	const { path } = useParams();

	useEffect(() => {
		setNewList(data);
	}, [data]);

	const getIfItemWasRecentPurchased = (item) => {
		let now = new Date();
		const lastPurchased = item.dateLastPurchased;

		// miliseconds
		const oneDay = 60 * 60 * 24 * 1000;

		const diff = now - lastPurchased.seconds * 1000;

		return diff > oneDay ? false : true;
	};

	const setPurchaseDate = (item) => {
		updateItem(item);
	};
	return (
		<>
			<h2>
				You are on the <code>{path}</code> list!
			</h2>
			<SearchList data={data} setNewList={setNewList} />
			<ul>
				{newList.map((item) => (
					<ListItem
						key={item.id}
						name={item.name}
						setPurchaseDate={setPurchaseDate}
						isRecentlyPurchased={getIfItemWasRecentPurchased(item)}
					/>
				))}
			</ul>
		</>
	);
}
