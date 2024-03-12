import { useNavigate } from 'react-router-dom';
import './SingleList.css';
import { deleteList } from '../api/firebase';

export function SingleList({
	name,
	path,
	setListPath,
	userId,
	userEmail,
	listName,
}) {
	const navigate = useNavigate();
	function handleClick() {
		setListPath(path);
		navigate(`/list/${path}`);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
			<button
				className="List__delete-button"
				onClick={() =>
					window.confirm('Do you really want to delete this item?') &&
					deleteList(userId, userEmail, listName)
				}
			>
				Delete List
			</button>
		</li>
	);
}
