import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();

	const categoryArray = [
		['Overdue', t('Overdue')],
		['Buy Soon', t('BuySoon')],
		['Buy Soonish', t('BuySoonish')],
		['Buy Not Soon', t('BuyNotSoon')],
		['Inactive', t('Inactive')],
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
		<div className="flex flex-col pt-16 pb-24 px-4  max-w-xl justify-center items-center align-center mx-auto">
			<h1 className="font-amiri text-2xl sm:text-3xl text-darkPurple mb-10">
				{path[0].toUpperCase() + path.slice(1)}
			</h1>

			{data.length === 0 ? (
				<div className="text-xl sm:text-2xl py-8 w-full">
					<p className="pb-12 text-darkPurple font-poppins">
						{t('MessageNoItem1')}
					</p>
					<p className="pb-12 text-darkPurple font-poppins">
						{t('MessageNoItem2')}
					</p>
					<ListButtons colorAdd={'purple'} colorShare={'white'} />
				</div>
			) : (
				<div className="py-8 w-full text-base sm:text-lg">
					<SearchList data={sortedList} setNewList={setNewList} />
					<ListButtons colorAdd={'white'} colorShare={'white'} />
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
