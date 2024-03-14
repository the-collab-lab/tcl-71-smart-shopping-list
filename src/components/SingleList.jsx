import { useNavigate } from 'react-router-dom';
import './SingleList.css';
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
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
			<button
				className="List__delete-button"
				onClick={() => handleDelete(userId, userEmail, path, name)}
			>
				Delete List
			</button>
		</li>
	);
}
