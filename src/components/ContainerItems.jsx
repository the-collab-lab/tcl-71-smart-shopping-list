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
			if (item.category === category) {
				return true;
			} else return false;
		});
		setFilteredItemsList(newItemList);
	}, [newList, category]);

	return filteredItemsList[0] ? (
		<section>
			<h2>{category}</h2>
			<ul>
				{filteredItemsList.map((item, i) => {
					if (item.category === category) {
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
