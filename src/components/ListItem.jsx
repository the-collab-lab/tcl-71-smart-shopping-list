import './ListItem.css';
import { useState } from 'react';

export function ListItem({
	dateLastPurchased,
	name,
	isRecentlyPurchased,
	updatePurchaseDate,
	listPath,
	itemId,
}) {
	const [inputValue, setInputValue] = useState(isRecentlyPurchased);
	const [datePrevPurchased, setDatePrevPurchased] = useState(dateLastPurchased);

	return (
		<li className="ListItem">
			<span>{name}</span>
			<input
				type="checkbox"
				onChange={() => {
					if (!inputValue) {
						const date = new Date();
						updatePurchaseDate(listPath, itemId, date);
					} else {
						updatePurchaseDate(listPath, itemId, datePrevPurchased);
					}
					setInputValue(!inputValue);
				}}
				checked={inputValue}
			></input>
		</li>
	);
}
