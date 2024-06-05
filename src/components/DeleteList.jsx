import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { deleteList } from '../api/firebase';
import Confirm from './Confirm';

const DeleteList = ({ user, email, listPath, listName, setListPath }) => {
	const { t } = useTranslation();

	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleDelete = async (user, email, listPath, listName) => {
		setSubmitted(true);
		try {
			await deleteList(user, email, listPath, listName);
			setSubmitted((prevSubmitted) => !prevSubmitted);
			setOpen((prevOpen) => !prevOpen);
			setListPath('');
		} catch (error) {
			setSubmitted(false);
			console.log(error);
		}
		return;
	};

	const openConfirm = () => {
		setOpen(true);
	};
	const closeConfirm = () => {
		setOpen(false);
	};

	const listNameUppercase = listName.toUpperCase();

	const buttonTranslated = t('ButtonDeleteList', { listNameUppercase });

	const titleTranslated = (
		<Trans i18nKey="ModalDeleteListTitle" listNameUppercase={listNameUppercase}>
			Delete {{ listNameUppercase }} List
		</Trans>
	);

	const textSuppressionTranslated = (
		<Trans
			i18nKey="ModalDeleteListConfirmSuppression"
			listNameUppercase={listNameUppercase}
		>
			Do you really want to delete {{ listNameUppercase }} list?
		</Trans>
	);

	const textStopUsingTranslated = (
		<Trans
			in18Key="ModalDeleteListStopUsing"
			listNameUppercase={listNameUppercase}
		>
			Do you really want to stop using {{ listNameUppercase }} list?{' '}
		</Trans>
	);

	return (
		<>
			<button
				onClick={openConfirm}
				aria-label={buttonTranslated}
				title={buttonTranslated}
				className="rounded-md transition ease-in-out hover:text-alertRed focus:text-alertRed px-4 py-2"
			>
				<i className="fa-solid fa-trash"></i>
			</button>
			<Confirm
				title={titleTranslated}
				onClose={closeConfirm}
				onConfirm={() => handleDelete(user, email, listPath, listName)}
				open={open}
				loading={submitted}
			>
				{listPath.includes(user)
					? textSuppressionTranslated
					: textStopUsingTranslated}
			</Confirm>
		</>
	);
};

export default DeleteList;
