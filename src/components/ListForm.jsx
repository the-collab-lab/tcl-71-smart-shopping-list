import { useState } from 'react';
import { createList } from '../api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { inputHasValue } from '../utils/inputValidation';
import { stringsHaveSameValue } from '../utils/inputValidation';

const ListForm = (props) => {
	const { setMessage, setListPath, userId, userEmail, data } = props;
	const [newList, setNewList] = useState('');
	const navigate = useNavigate();
	const { t } = useTranslation();

	const checkNameNewList = (newList) => {
		if (data.some((item) => stringsHaveSameValue(newList, item.name))) {
			return true;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!inputHasValue(newList)) {
			setMessage(t('errorCreatingListEmpty'));
			setNewList('');
			return;
		}
		if (checkNameNewList(newList)) {
			setMessage(t('errorCreatingListExistingName'));
			setNewList('');
			return;
		}

		try {
			const response = await createList(userId, userEmail, newList);
			if (response) {
				setListPath(
					`${response._key.path.segments[0]}/${response._key.path.segments[1]}`,
				);
				navigate(
					`/list/${response._key.path.segments[0]}/${response._key.path.segments[1]}`,
				);
			}
		} catch (error) {
			if (error) {
				setMessage(t('errorCreatingListFailed'));
			}
		}
		setNewList('');
	};

	const handleInputChange = (event) => {
		const data = event.target.value;
		setNewList(data);
		setMessage(null);
	};
	const handleKeyPressed = (event) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col sm:flex-row gap-4 text-base sm:text-lg"
		>
			<input
				aria-label="Type a new list name"
				type="text"
				id="new list name"
				placeholder={t('InputTypeNewListName')}
				value={newList}
				onChange={(event) => handleInputChange(event)}
				onClick={(event) => handleKeyPressed(event)}
				className="grow shrink bg-lightGrey border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple"
			/>
			<button
				type="submit"
				className="bg-lightPurple text-puurWhite flex justify-center shadow-lg rounded-md transition ease-in-out hover:bg-hoverPurple px-4 py-2 gap-6 shrink-0"
			>
				<div>
					<i className="fa-solid fa-plus"></i>
				</div>
				{t('ButtonCreateList')}
			</button>
		</form>
	);
};

export default ListForm;
