import { useState, useEffect } from 'react';
import { ContainerItems } from '../components';
import { SearchList } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import { updateItem, comparePurchaseUrgency } from '../api/firebase';
import { isMoreThanADayAgo } from '../utils';
import Loading from '../components/Loading';
import ListButtons from '../components/ListButtons';

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
		<div className="flex flex-col py-16 px-4  max-w-xl justify-center items-center align-center mx-auto">
			<h1 className="font-amiri text-4xl text-darkPurple mb-10">{path}</h1>

			{data.length === 0 ? (
				<div className="text-2xl  md:w-2/4 w-3/4">
					<p className="pb-12 text-darkPurple font-poppins">
						This is your new list. There are no items added yet...
					</p>
					<p className="pb-12 text-darkPurple font-poppins">
						You can now add items, specify when you need to purchase them,
						and/or share the list with other users
					</p>
					<ListButtons colorAdd={'purple'} colorShare={'white'}></ListButtons>
				</div>
			) : (
				<div className="py-8 w-full">
					<SearchList data={sortedList} setNewList={setNewList} />
					<ListButtons colorAdd={'white'} colorShare={'white'}></ListButtons>
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
