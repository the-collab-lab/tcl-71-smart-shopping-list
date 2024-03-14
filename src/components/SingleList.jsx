import { useNavigate } from 'react-router-dom';
import './SingleList.css';
import { deleteList } from '../api/firebase';

export function SingleList({ name, path, setListPath, userId }) {
	const navigate = useNavigate();
	function handleClick() {
		setListPath(path);
		navigate(`/list/${path}`);
	}

	function handleDelete(user, listPath, listName) {
		if (
			window.confirm(
				`Do you really want to delete ${listName.toUpperCase()} list?`,
			)
		) {
			deleteList(user, listPath, listName);
		}
		return;
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
			{path.includes(userId) && (
				<button
					className="List__delete-button"
					onClick={() => handleDelete(userId, path, name)}
				>
					Delete List
				</button>
			)}
		</li>
	);
}
