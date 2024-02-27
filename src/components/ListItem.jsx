import './ListItem.css';
import { useState } from 'react';

export function ListItem({
	name,
	isRecentlyPurchased,
	setPurchaseDate,
	listPath,
	itemId,
}) {
	const [inputValue, setInputValue] = useState(isRecentlyPurchased);

	return (
		<li className="ListItem">
			<span>{name}</span>
			<input
				type="checkbox"
				onChange={() => {
					setPurchaseDate(listPath, itemId);
					setInputValue(!inputValue);
				}}
				checked={inputValue}
			></input>
		</li>
	);
}
