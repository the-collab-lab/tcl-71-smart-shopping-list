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

	const isMoreThanADayAgo = (date) => {
		let now = new Date();
		const dateInMiliseconds = date.seconds * 1000;
		const oneDayInMiliseconds = 60 * 60 * 24 * 1000;
		const diff = now - dateInMiliseconds;
		return oneDayInMiliseconds > diff;
	};

	const getIfItemWasRecentPurchased = (item) => {
		if (!item.dateLastPurchased) {
			return false;
		}
		return isMoreThanADayAgo(item.dateLastPurchased);
	};

	const setPurchaseDate = (listPath, item) => {
		updateItem(listPath, item);
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
						itemId={item.id}
						setPurchaseDate={setPurchaseDate}
						isRecentlyPurchased={getIfItemWasRecentPurchased(item)}
						listPath={listPath}
					/>
				))}
			</ul>
		</>
	);
}
