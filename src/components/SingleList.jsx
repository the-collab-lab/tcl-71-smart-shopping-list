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
		<li className="mb-10 bg-lightRurple w-full text-puurWhite flex justify-end shadow-lg rounded-md transition ease-in-out hover:bg-darkPurple">
			<button
				onClick={handleClick}
				className="w-full px-10 py-4 overflow-x-hidden"
			>
				{name}
			</button>
			<button
				className="transition ease-in-out hover:text-alertRed focus:text-alertRed px-10 py-4"
				onClick={() => handleDelete(userId, userEmail, path, name)}
				aria-label="Delete List"
				title="Delete List"
			>
				<i className="fa-solid fa-trash"></i>
			</button>
		</li>
	);
}
