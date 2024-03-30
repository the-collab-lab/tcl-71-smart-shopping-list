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
				<div>
					<label className="flex items-center justify-center">
						<div className="relative ">
							<input
								type="checkbox"
								// onChange={() => {
								// 	updatePurchaseDate(listPath, itemId);
								// }}
								id={itemId}
								// checked={isRecentlyPurchased}
								// disabled={isRecentlyPurchased}
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
						<span className=" group-focus:text-darkPurple">{`Mark ${name} as purchased`}</span>
					</label>
				</div>

				{/* <a
					href="/"
					class="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
				>
					<div class="flex items-center space-x-3">
						<svg
							class="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
							fill="none"
							viewBox="0 0 24 24"
						></svg>
						<h3 class="text-slate-900 group-hover:text-white text-sm font-semibold">
							New project
						</h3>
					</div>
					<p class="text-slate-500 group-hover:text-white text-sm">
						Create a new project from a variety of starting templates.
					</p>
				</a> */}

				<span className="{{ isRecentlyPurchased ? 'line-through text-lightGrey' : 'text-darkPurple' }} text-lg">
					{name}
				</span>
				<button
					className="ListItem__delete-button"
					onClick={() => handleDelete(listPath, itemId, name)}
					aria-label={`Delete ${name}`}
				>
					<i className="fa-solid fa-x fa-xs"></i>
				</button>
			</li>
		</div>
	);
}
