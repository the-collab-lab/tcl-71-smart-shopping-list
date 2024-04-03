import { useState } from 'react';
import { deleteItem } from '../api/firebase';
import Confirm from './Confirm';

const DeleteItem = ({ itemName, listPath, itemId }) => {
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleDelete = (listPath, itemId) => {
		setIsSubmitted(true);
		deleteItem(listPath, itemId);
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
				aria-label={`Delete ${itemName}`}
				title={`Delete ${itemName}`}
				className="px-2 text-darkPurple rounded-md transition ease-in-out hover:text-alertRed focus:text-alertRed"
			>
				<i className="fa-solid fa-trash"></i>
			</button>
			<Confirm
				title={`Delete ${itemName.toUpperCase()}`}
				onClose={closeConfirm}
				onConfirm={() => handleDelete(listPath, itemId)}
				open={isConfirmOpen}
				loading={isSubmitted}
			>
				{`Do you really want to delete ${itemName.toUpperCase()} from this list?`}
			</Confirm>
		</>
	);
};

export default DeleteItem;
