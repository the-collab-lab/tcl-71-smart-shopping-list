import { useState, useEffect } from 'react';
import { ContainerItems } from '../components';
import { SearchList } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import { updateItem, comparePurchaseUrgency } from '../api/firebase';
import { isMoreThanADayAgo } from '../utils';
import Loading from '../components/Loading';

export function List({ data, lists, listPath, isLoadingListData }) {
	const [newList, setNewList] = useState([]);
	const [sortedList, setSortedList] = useState([]);
	const { path } = useParams();
	const navigate = useNavigate();
	const categoryArray = [
		'Overdue',
		'Buy Soon',
		'Buy Soonish',
		'Buy Not Soon',
		'Inactive',
	];

	useEffect(() => {
		const getDataSorted = comparePurchaseUrgency(data);
		setNewList(getDataSorted);
		setSortedList(getDataSorted);
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

	if (isLoadingListData) {
		return <Loading />;
	}

	return (
		<div className="text-center flex-column ">
			<h1 className="font-amiri text-5xl text-darkPurple ">{path}</h1>

			{data.length === 0 ? (
				<div className="text-3xl font-poppins text-darkPurple">
					<p>This is your new list. There are no items added yet...</p>
					<p>
						You can now add items, specify when you need to purchase them,
						and/or share the list with other users
					</p>

					<button className="font-poppins bg-lightRurple p-5 rounded-lg w-3/4">
						<span
							aria-hidden="true"
							focusable="false"
							width="24"
							height="28"
							viewBox="0 0 24 28"
						>
							<i class="fa-solid fa-plus"></i>
						</span>
						<span className="text-white">Add item</span>
					</button>
				</div>
			) : (
				<div>
					<SearchList data={sortedList} setNewList={setNewList} />
					{categoryArray.map((category, i) => (
						<ContainerItems
							key={i}
							category={category}
							newList={newList}
							wasRecentlyPurchased={wasRecentlyPurchased}
							listPath={listPath}
							updatePurchaseDate={updatePurchaseDate}
						/>
					))}
				</div>
			)}
		</div>
	);
}
