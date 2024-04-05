import { useState } from 'react';
import { deleteItem } from '../api/firebase';
import Confirm from './Confirm';

const DeleteItem = ({ itemName, listPath, itemId }) => {
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleDelete = (listPath, itemId) => {
		setSubmitted(true);
		deleteItem(listPath, itemId);
		return;
	};

	const openConfirm = () => {
		setOpen(true);
	};
	const closeConfirm = () => {
		setOpen(false);
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
				open={open}
				loading={submitted}
			>
				{`Do you really want to delete ${itemName.toUpperCase()} from this list?`}
			</Confirm>
		</>
	);
};

export default DeleteItem;
