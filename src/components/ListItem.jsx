import './ListItem.css';
import { deleteItem } from '../api/firebase';

export function ListItem({
	isRecentlyPurchased,
	itemId,
	listPath,
	name,
	updatePurchaseDate,
}) {
	return (
		<li className="ListItem">
			<span className={isRecentlyPurchased ? 'ListItem__checked' : ''}>
				{name}
			</span>
			<div className="ListItem__input">
				<input
					type="checkbox"
					onChange={() => {
						updatePurchaseDate(listPath, itemId);
					}}
					id={itemId}
					checked={isRecentlyPurchased}
					disabled={isRecentlyPurchased}
				/>
				<label
					htmlFor={itemId}
					className="ListItem__label"
				>{`Mark ${name} as purchased`}</label>
			</div>
			<button onClick={() => deleteItem(listPath, itemId)}>Delete item</button>
		</li>
	);
}
