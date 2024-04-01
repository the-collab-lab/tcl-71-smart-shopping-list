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
		<div className="my-16 mx-auto max-w-xl flex flex-col text-center text-darkPurple font-poppins px-4">
			<h1 className="font-amiri text-4xl text-darkPurple p-8">{listPath}</h1>
			<div className="text-xl mx-auto py-8 md:w-2/4 w-3/4">
				<p className="pb-12 text-darkPurple font-poppins">
					Add new items and share your list with other users
				</p>
			</div>
			<section className="mb-20 pb-20">
				<div className="ManageList__form">
					<form method="post" onSubmit={handleSubmit}>
						<label className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 my-8">
							ADD A NEW ITEM
							<input
								type="text"
								placeholder="Type a new item name"
								name="item"
								className="my-5 grow shrink bg-puurWhite border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple"
								onChange={() => setAddItemErrMessage('')}
							></input>
						</label>
						<div className="my-5 grow shrink bg-puurWhite border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple">
							<label htmlFor="time-select">
								Choose item's likely need date
							</label>
							<select name="time" id="time-select ">
								<option value="soon">Soon (within 7 days)</option>
								<option value="soonIsh">Soon-ish (in 14 days)</option>
								<option value="notSoon">Not soon (in 30 days)</option>
							</select>
						</div>
						<button
							type="submit"
							className="flex items-center justify-center  rounded-lg bg-darkPurple border-darkPurple text-offWhite"
						>
							Submit
						</button>
					</form>
					{addItemErrMessage !== '' && (
						<ErrorMessage errorMessage={addItemErrMessage} />
					)}
				</div>
			</section>
			<section className="my-20">
				<form method="post" onSubmit={sendInvite}>
					<label
						htmlFor="email"
						className="my-8 text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2"
					>
						SHARE THE LIST
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Share this list with another user"
							className="my-5 grow shrink bg-puurWhite border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple"
							onChange={() => setShareListErrMessage('')}
						></input>
					</label>
					<button
						type="submit"
						className="flex items-center justify-center  rounded-lg bg-white border-offWhite text-darkPurple"
					>
						Submit
					</button>
				</form>
				{shareListErrMessage !== '' && (
					<ErrorMessage errorMessage={shareListErrMessage} />
				)}
			</section>
		</div>
	);
}
