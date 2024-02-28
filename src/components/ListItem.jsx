import './ListItem.css';
import { useState } from 'react';

export function ListItem({
	isRecentlyPurchased,
	itemId,
	listPath,
	name,
	updatePurchaseDate,
}) {
	const [inputValue, setInputValue] = useState(isRecentlyPurchased);

	return (
		<li className="ListItem">
			<span>{name}</span>
			<input
				type="checkbox"
				onChange={() => {
					setInputValue(!inputValue);
					if (!inputValue) {
						const date = new Date();
						updatePurchaseDate(listPath, itemId, date);
					} else {
						updatePurchaseDate(listPath, itemId, null);
					}
				}}
				checked={inputValue}
			></input>
		</li>
	);
}
