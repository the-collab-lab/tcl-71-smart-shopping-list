import { useState } from 'react';
import { addItem } from '../api/firebase';
import { shareList } from '../api/firebase';
import './ManageList.css';
import ErrorMessage from '../components/ErrorMessage';
import {
	inputHasValue,
	inputHasOnlyNUmbers,
	stringsHaveSameValue,
} from '../utils/inputValidation';

export function ManageList({ data, listPath, userId, userEmail }) {
	const [addItemErrMessage, setAddItemErrMessage] = useState('');
	const [shareListErrMessage, setShareListErrMessage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		let itemName = formData.get('item');
		let time = formData.get('time');

		if (!inputHasValue(itemName) || inputHasOnlyNUmbers(itemName)) {
			setAddItemErrMessage('Please enter an item');
			form.reset();
			return;
		}

		if (data.some((item) => stringsHaveSameValue(item.name, itemName))) {
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

	const createShareListMessages = (recipientEmail) => {
		return {
			ok: `The list has been shared with ${recipientEmail}!`,
			missing: `It seems like "${recipientEmail}" isn't a valid user email`,
			existing: `The list is already shared with ${recipientEmail}`,
			invalidEmail: 'Share the list by entering a valid user email',
			repeatedEmail:
				'To share the list, enter the email of a user that is not you',
		};
	};

	async function sendInvite(e) {
		e.preventDefault();

		const mailForm = e.target;
		const mailFormData = new FormData(mailForm);
		let email = mailFormData.get('email');
		const shareListMessages = createShareListMessages(email);
		if (!inputHasValue(email)) {
			setShareListErrMessage(shareListMessages['invalidEmail']);
			mailForm.reset();
			return;
		}

		if (email === userEmail) {
			setShareListErrMessage(shareListMessages['repeatedEmail']);
			mailForm.reset();
			return;
		}

		const response = await shareList(listPath, userId, email);

		if (response) {
			alert(shareListMessages[response.code]);
		}
		mailForm.reset();
	}

	return (
		<div>
			<div className="text-center flex flex-col py-2 min-w-96 justify-center items-center align-center mx-auto">
				<h1 className="font-amiri text-4xl text-darkPurple p-8">{listPath}</h1>
			</div>

			<div className="text-2xl py-8 md:w-2/4 w-3/4">
				<p className="pb-12 text-darkPurple font-poppins">
					Add new items and share your list with other users
				</p>
			</div>

			<section className="mb-20">
				<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8">
					ADD A NEW ITEM
				</h2>
				<div className="ManageList__form">
					<form method="post" onSubmit={handleSubmit}>
						<label>
							Add Item
							<input
								type="text"
								placeholder="Type a new item name"
								name="item"
								className="grow shrink bg-puurWhite border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple"
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
					{addItemErrMessage !== '' && (
						<ErrorMessage errorMessage={addItemErrMessage} />
					)}
				</div>
			</section>
			<section className="mb-20">
				<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8">
					SHARE LIST WITH ANOTHER USER
				</h2>
				<div className="ManageList__form">
					<form method="post" onSubmit={sendInvite}>
						<label htmlFor="email">
							Share List with another user
							<input
								type="email"
								name="email"
								id="email"
								onChange={() => setShareListErrMessage('')}
							></input>
						</label>
						<button type="submit">Submit</button>
					</form>
					{shareListErrMessage !== '' && (
						<ErrorMessage errorMessage={shareListErrMessage} />
					)}
				</div>
			</section>
		</div>
	);
}
