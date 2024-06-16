import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { deleteItem } from '@api';
import { Confirm } from '@components';

const DeleteItem = ({ itemName, listPath, itemId }) => {
	const { t } = useTranslation();

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
	const itemNameUppercase = itemName.toUpperCase();
	const titleTranslated = (
		<Trans i18nKey="ModalDeleteItemTitle" itemNameUppercase={itemNameUppercase}>
			Delete {{ itemNameUppercase }}
		</Trans>
	);

	const textTranslated = (
		<Trans i18nKey="ModalDeleteItemText" itemNameUppercase={itemNameUppercase}>
			Do you really want to delete {{ itemNameUppercase }} from this list?{' '}
		</Trans>
	);

	const deleteItemName = t('DeleteItemName', { itemName });

	return (
		<>
			<button
				onClick={openConfirm}
				aria-label={deleteItemName}
				title={deleteItemName}
				className="px-2 text-darkPurple rounded-md transition ease-in-out hover:text-alertRed focus:text-alertRed"
			>
				<i className="fa-solid fa-trash"></i>
			</button>
			<Confirm
				title={titleTranslated}
				onClose={closeConfirm}
				onConfirm={() => handleDelete(listPath, itemId)}
				open={open}
				loading={submitted}
			>
				{textTranslated}
			</Confirm>
		</>
	);
};

export default DeleteItem;
