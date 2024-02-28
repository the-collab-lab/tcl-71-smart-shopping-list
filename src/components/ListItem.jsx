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
			<span className={inputValue ? 'ListItem__checked' : ''}>{name}</span>
			<div className="ListItem__input">
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
					id={itemId}
				/>
				<label
					htmlFor={itemId}
					className="ListItem__label"
				>{`Mark ${name} as purchased`}</label>
			</div>
		</li>
	);
}
