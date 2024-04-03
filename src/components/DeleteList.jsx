import { useState } from 'react';
import { deleteList } from '../api/firebase';
import Confirm from './Confirm';

const DeleteList = ({ user, email, listPath, listName, setListPath }) => {
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleDelete = (user, email, listPath, listName) => {
		setIsSubmitted(true);
		deleteList(user, email, listPath, listName);
		setListPath('');
		return;
	};

	const openConfirm = () => {
		setIsConfirmOpen(true);
	};
	const closeConfirm = () => {
		setIsConfirmOpen(false);
	};

	return (
		<>
			<button
				onClick={openConfirm}
				aria-label={`Delete ${listName.toUpperCase()}`}
				title={`Delete ${listName.toUpperCase()}`}
				className="rounded-md transition ease-in-out hover:text-alertRed focus:text-alertRed px-4 py-2"
			>
				<i className="fa-solid fa-trash"></i>
			</button>
			<Confirm
				title={`Delete ${listName.toUpperCase()} List`}
				onClose={closeConfirm}
				onConfirm={() => handleDelete(user, email, listPath, listName)}
				open={isConfirmOpen}
				loading={isSubmitted}
			>
				{listPath.includes(user)
					? `Do you really want to delete ${listName.toUpperCase()} list?`
					: `Do you really want to stop using ${listName.toUpperCase()} list?`}
			</Confirm>
		</>
	);
};

export default DeleteList;
