import { useNavigate } from 'react-router-dom';
import DeleteList from './DeleteList';

export function SingleList({ userEmail, name, path, setListPath, userId }) {
	const navigate = useNavigate();
	function handleClick() {
		setListPath(path);
		navigate(`/list/${path}`);
	}

	return (
		<li className="mb-8 bg-lightPurple w-full text-puurWhite flex justify-end shadow-lg rounded-md transition ease-in-out relative text-lg sm:text-xl hover:bg-hoverPurple">
			<button
				onClick={handleClick}
				className="w-full px-4 py-2 overflow-x-hidden rounded-md"
			>
				{name}
			</button>
			<DeleteList
				user={userId}
				email={userEmail}
				listPath={path}
				listName={name}
				setListPath={setListPath}
			/>
		</li>
	);
}
