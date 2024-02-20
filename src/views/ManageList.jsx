import { useState } from 'react';
import { addItem } from '../api/firebase';
import { shareList } from '../api/firebase';

export function ManageList({ listPath, userId, userEmail }) {
	const [errMessage, setErrMessage] = useState('');
	const inputHasValue = (value) => {
		return value.trim().length === 0 ? false : true;
	};

	async function handleSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		let itemName = formData.get('item');
		let time = formData.get('time');

		let daysUntilNextPurchase;
		if (time === 'soon') {
			daysUntilNextPurchase = 7;
		} else if (time === 'soonIsh') {
			daysUntilNextPurchase = 14;
		} else {
			daysUntilNextPurchase = 30;
		}

		if (!inputHasValue(itemName)) {
			form.reset();
			return;
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
					<input type="text" name="item"></input>
				</label>
				<label htmlFor="time-select">When do I need it?</label>
				<select name="time" id="time-select">
					<option value="soon">Soon</option>
					<option value="soonIsh">Soon-ish</option>
					<option value="notSoon">Not soon</option>
				</select>
				<button type="submit">Submit</button>
			</form>
			<hr />
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
			{errMessage !== '' ? <p>{errMessage}</p> : null}
		</>
	);
}
