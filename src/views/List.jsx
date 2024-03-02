import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import SearchList from '../components/SearchList';
import { useParams, useNavigate } from 'react-router-dom';
import { updateItem } from '../api/firebase';
import { isMoreThanADayAgo } from '../utils';
import './List.css';
import addFirstItem from '../pictures/addFirstItem.png';

export function List({ data, lists, listPath }) {
	const [newList, setNewList] = useState([]);
	const { path } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setNewList(data);
	}, [data]);

	const wasRecentlyPurchased = (item) => {
		if (!item.dateLastPurchased) {
			return false;
		}
		return !isMoreThanADayAgo(item.dateLastPurchased);
	};

	const updatePurchaseDate = (listPath, item, date) => {
		updateItem(listPath, item, date);
	};

	return (
		<>
			<h2>
				You are on the <code>{path}</code> list!
			</h2>
			{data.length === 0 && lists.length === 1 && (
				<div className="containerAddItem">
					<p>Well done! You have created your very first list!</p>
					<p>
						You can now add some items and specify when you need to purchase
						them. In the box for "Add item" you put the item you need to
						purchase and then select how soon you need it on "When do I need it"
					</p>
					<img
						className="addItemPNG"
						src={addFirstItem}
						alt="add item example"
					/>

					<button id="addFirstItem" onClick={() => navigate('/manage-list')}>
						Start adding items!
					</button>
				</div>
			)}
			{data.length === 0 && lists.length > 1 && (
				<div className="containerAddItem">
					<p>Well done! You have created a new list!</p>
					<p>
						You can now add some items and specify when you need to purchase
						them.
					</p>

					<button id="addFirstItem" onClick={() => navigate('/manage-list')}>
						Start adding items!
					</button>
				</div>
			)}
			{data.length > 0 && (
				<div>
					<SearchList data={data} setNewList={setNewList} />
					<ul>
						{newList.map((item) => (
							<ListItem
								dateLastPurchased={item.dateLastPurchased}
								isRecentlyPurchased={wasRecentlyPurchased(item)}
								itemId={item.id}
								key={item.id}
								listPath={listPath}
								name={item.name}
								purchaseDate={item.dateLastPurchased}
								updatePurchaseDate={updatePurchaseDate}
							/>
						))}
					</ul>
				</div>
			)}
		</>
	);
}
