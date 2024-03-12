import { ListItem } from './ListItem';
import { Fragment } from 'react';

const ContainerItems = ({
	category,
	newList,
	wasRecentlyPurchased,
	listPath,
	updatePurchaseDate,
}) => {
	return (
		<section>
			<h2>{category}</h2>
			<ul>
				{newList.map((item, i) => {
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
	);
};

export default ContainerItems;
