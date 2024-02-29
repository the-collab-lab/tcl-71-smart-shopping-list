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
					onChange={(e) => {
						setInputValue(e.target.value);
						if (e.target.value) {
							updatePurchaseDate(listPath, itemId);
						}
					}}
					id={itemId}
					checked={isRecentlyPurchased}
				/>
				<label
					htmlFor={itemId}
					className="ListItem__label"
				>{`Mark ${name} as purchased`}</label>
			</div>
		</li>
	);
}
