import { useEffect, useState } from 'react';
import { ListItem } from './ListItem';
import { Fragment } from 'react';

export const ContainerItems = ({
	category,
	newList,
	wasRecentlyPurchased,
	listPath,
	updatePurchaseDate,
}) => {
	const [filteredItemsList, setFilteredItemsList] = useState([]);

	useEffect(() => {
		const newItemList = newList.filter((item) => {
			if (item.category === category[0]) {
				return true;
			} else return false;
		});
		setFilteredItemsList(newItemList);
	}, [newList, category]);

	return filteredItemsList[0] ? (
		<section className="text-left">
			<h2 className="font-poppins uppercase font-bold text-darkPurple pt-8 text-lg sm:text-xl">
				{category[1]}
			</h2>
			<ul>
				{filteredItemsList.map((item, i) => {
					if (item.category === category[0]) {
						return (
							<ListItem
								key={item.id}
								dateLastPurchased={item.dateLastPurchased}
								isRecentlyPurchased={wasRecentlyPurchased(item)}
								itemId={item.id}
								listPath={listPath}
								name={item.name}
								purchaseDate={item.dateLastPurchased}
								updatePurchaseDate={updatePurchaseDate}
							/>
						);
					} else return <Fragment key={i} />;
				})}
			</ul>
		</section>
	) : (
		<> </>
	);
};
