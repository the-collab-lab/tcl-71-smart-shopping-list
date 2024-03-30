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
		<div
			href="/"
			className="bg-lightGrey hover:bg-white rounded-lg p-5 my-3 font-poppins"
		>
			<li className="flex items-center justify-between">
				<div className=" flex items-center justify-start">
					<label className="flex items-center justify-center">
						<div className="relative">
							<input
								type="checkbox"
								onChange={() => {
									updatePurchaseDate(listPath, itemId);
								}}
								id={itemId}
								checked={isRecentlyPurchased}
								disabled={isRecentlyPurchased}
								className="peer absolute size-4 opacity-0"
							/>

							<svg
								width="22"
								height="22"
								version="1.1"
								fill="white"
								xmlns="http://www.w3.org/2000/svg"
								className="rounded-xl fill-white stroke-2 stroke-darkPurple peer-focus:ring-2 ring-blue-900 peer-checked:fill-darkPurple"
							>
								<circle cx="11" cy="11" r="10" />
							</svg>
						</div>
						<span className="sr-only">{`Mark ${name} as purchased`}</span>
					</label>

					<span className="{{ isRecentlyPurchased ? 'line-through text-lightGrey' : 'text-darkPurple' }} text-darkPurple text-lg ps-5">
						{name}
					</span>
				</div>
				<button
					className="px-1 text-darkPurple"
					onClick={() => handleDelete(listPath, itemId, name)}
					aria-label={`Delete ${name}`}
				>
					<i className="fa-solid fa-x fa-2xs"></i>
				</button>
			</li>
		</div>
	);
}
