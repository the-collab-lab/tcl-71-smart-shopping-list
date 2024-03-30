import { useNavigate } from 'react-router-dom';
import { deleteList } from '../api/firebase';

export function SingleList({ userEmail, name, path, setListPath, userId }) {
	const navigate = useNavigate();
	function handleClick() {
		setListPath(path);
		navigate(`/list/${path}`);
	}

	function handleDelete(user, email, listPath, listName) {
		if (listPath.includes(user)) {
			if (
				window.confirm(
					`Do you really want to delete ${listName.toUpperCase()} list?`,
				)
			) {
				deleteList(user, email, listPath, listName);
			}
			return;
		}
		if (
			window.confirm(
				`Do you really want to stop using ${listName.toUpperCase()} list?`,
			)
		) {
			deleteList(user, email, listPath, listName);
		}
		return;
	}

	return (
		<li className="mb-8 bg-lightPurple w-full text-puurWhite flex justify-end shadow-lg rounded-md transition ease-in-out relative text-lg sm:text-xl md:text-regular">
			<button
				onClick={handleClick}
				className="w-full px-4 py-2 overflow-x-hidden hover:bg-darkPurple rounded-md"
			>
				{name}
			</button>
			<button
				className="rounded-md transition ease-in-out hover:text-alertRed focus:text-alertRed px-4 py-2 absolute right-0 bg-lightPurple hover:bg-darkPurple"
				onClick={() => handleDelete(userId, userEmail, path, name)}
				aria-label={`Delete ${name} List`}
				title={`Delete ${name} List`}
			>
				<i className="fa-solid fa-trash"></i>
			</button>
		</li>
	);
}
