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
			<h1 className="font-amiri text-4xl text-darkPurple p-6">{path}</h1>

			{data.length === 0 ? (
				<div className="text-2xl py-6">
					<p className="py-5 text-darkPurple font-poppins">
						This is your new list. There are no items added yet...
					</p>
					<p className="py-6 text-darkPurple font-poppins">
						You can now add items, specify when you need to purchase them,
						and/or share the list with other users
					</p>

					<div className="grid grid-cols-3 gap-x-2 py-6">
						<button
							className="flex items-center justify-center bg-lightPurple rounded-lg col-span-2 py-5"
							onClick={() => navigate('/manage-list')}
						>
							<i class="fa-solid fa-plus inverse"></i>

							<span className="ps-2 text-white text-lg font-poppins">
								Add item
							</span>
						</button>
						<button
							className="flex items-center justify-center bg-white border rounded-lg col-span-1"
							onClick={() => navigate('/manage-list')}
						>
							<i class="fa-solid fa-share-nodes"></i>

							<span className="ps-2 text-lg font-poppins">Share list</span>
						</button>
					</div>
				</div>
			) : (
				<div>
					<SearchList data={sortedList} setNewList={setNewList} />
					<div className="grid grid-cols-3 gap-x-2 py-6">
						<button
							className="flex items-center justify-center bg-lightPurple rounded-lg col-span-2 py-5 hover:opacity-75"
							onClick={() => navigate('/manage-list')}
						>
							<i class="fa-solid fa-plus inverse"></i>

							<span className="ps-2 text-white text-lg font-poppins">
								Add item
							</span>
						</button>
						<button
							className="flex items-center justify-center bg-white border rounded-lg col-span-1"
							onClick={() => navigate('/manage-list')}
						>
							<i class="fa-solid fa-share-nodes"></i>

							<span className="ps-2 text-lg font-poppins">Share list</span>
						</button>
					</div>
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
