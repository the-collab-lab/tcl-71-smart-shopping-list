import { useState } from 'react';
import { addItem } from '../api/firebase';
import { shareList } from '../api/firebase';
import './ManageList.css';
import ErrorMessage from '../components/ErrorMessage';
import { inputHasValue, hasSameValue } from '../utils/inputValidation';

export function ManageList({ data, listPath, userId, userEmail }) {
	const [addItemErrMessage, setAddItemErrMessage] = useState('');
	const [errMessage, setErrMessage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		let itemName = formData.get('item');
		let time = formData.get('time');

		if (!inputHasValue(itemName)) {
			setAddItemErrMessage('Please enter an item');
			form.reset();
			return;
		}

		if (data.some((item) => hasSameValue(item.name, itemName))) {
			setAddItemErrMessage('This item is already in your list');
			form.reset();
			return;
		}

		let daysUntilNextPurchase;
		if (time === 'soon') {
			daysUntilNextPurchase = 7;
		} else if (time === 'soonIsh') {
			daysUntilNextPurchase = 14;
		} else {
			daysUntilNextPurchase = 30;
		}

		let response = await addItem(listPath, { itemName, daysUntilNextPurchase });

		if (response) {
			alert(`${itemName} added to the list!`);
		} else {
			alert(`${itemName} couldn't be added to the list...`);
		}

		form.reset();
	}

	async function sendInvite(e) {
		e.preventDefault();

		const mailForm = e.target;
		const mailFormData = new FormData(mailForm);
		let email = mailFormData.get('email');

		if (!inputHasValue(email)) {
			setErrMessage('Share the list by entering a valid user email');
			mailForm.reset();
			return;
		}

		if (email === userEmail) {
			setErrMessage(
				'To share the list, enter the email of a user that is not you',
			);
			mailForm.reset();
			return;
		}

		const response = await shareList(listPath, userId, email);
		if (response) {
			alert(`The list has been shared with ${email}!`);
		} else {
			alert(`It seems like "${email}" isn't a valid user email`);
		}
		mailForm.reset();
	}

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<form method="post" onSubmit={handleSubmit}>
				<label>
					Add item
					<input
						type="text"
						name="item"
						onChange={() => setAddItemErrMessage('')}
					></input>
				</label>
				<label htmlFor="time-select">When do I need it?</label>
				<select name="time" id="time-select">
					<option value="soon">Soon (within 7 days)</option>
					<option value="soonIsh">Soon-ish (in 14 days)</option>
					<option value="notSoon">Not soon (in 30 days)</option>
				</select>
				<button type="submit">Submit</button>
			</form>
			<ErrorMessage errorMessage={addItemErrMessage} />

			<hr></hr>
			<form method="post" onSubmit={sendInvite}>
				<label htmlFor="email">
					Share List with another user
					<input
						type="email"
						name="email"
						id="email"
						onChange={() => setErrMessage('')}
					></input>
				</label>
				<button type="submit">Submit</button>
			</form>
			<ErrorMessage errorMessage={errMessage} />
		</>
	);
}
