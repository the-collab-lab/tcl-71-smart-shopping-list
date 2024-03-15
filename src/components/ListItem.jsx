import './ListItem.css';
import { deleteItem } from '../api/firebase';

export function ListItem({
	isRecentlyPurchased,
	itemId,
	listPath,
	name,
	updatePurchaseDate,
}) {
	const handleDelete = (listPath, itemId, itemName) => {
		if (
			window.confirm(
				`Do you really want to delete ${itemName.toUpperCase()} from this list?`,
			)
		) {
			deleteItem(listPath, itemId);
		}
		return;
	};
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
			<button
				className="ListItem__delete-button"
				onClick={() => handleDelete(listPath, itemId, name)}
			>
				Delete Item
			</button>
		</li>
	);
}
