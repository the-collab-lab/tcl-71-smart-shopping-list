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
	let displayName;
	for (let i = 0; i < listPath.length; i++) {
		console.log(listPath[i]);
		if (listPath[i] == '/') {
			displayName = listPath.slice(i + 1);
			break;
		}
	}

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
		<div className="my-16 flex flex-col text-center items-center text-darkPurple font-poppins px-4">
			<h1 className="font-amiri text-4xl text-darkPurple p-8">{displayName}</h1>
			{console.log(listPath)}
			<div className="text-xl mx-auto py-8 md:w-2/4 w-3/4">
				<p className="pb-12 text-darkPurple font-poppins">
					Add new items and share your list with other users
				</p>
			</div>
			<section className="flex flex-col">
				<div className="flex flex-col">
					<form method="post" onSubmit={handleSubmit} className="flex flex-col">
						<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8">
							ADD A NEW ITEM
						</h2>

						<input
							aria-label="Add a new item"
							type="text"
							placeholder="Type a new item name"
							name="item"
							className="grow shrink bg-offWhite border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple my-5"
							onChange={() => setAddItemErrMessage('')}
						></input>
						<div className="flex flex-row">
							<div className="bag-4 bg-offWhite border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple my-5 mr-5">
								<select
									name="time"
									id="time-select "
									aria-label="When do you need this item?"
								>
									<option value="none" selected disabled hidden>
										Choose item's likely need date
									</option>

									<option value="soon">Soon (within 7 days)</option>
									<option value="soonIsh">Soon-ish (in 14 days)</option>
									<option value="notSoon">Not soon (in 30 days)</option>
								</select>
							</div>
							<button
								type="submit"
								className="flex items-center justify-center  gap-6 rounded-lg bg-lightPurple border-lightPurple text-offWhite my-5 px-5"
							>
								<span>
									<i class="fa-solid fa-plus"></i>
								</span>
								Add
							</button>
						</div>
					</form>
					{addItemErrMessage !== '' && (
						<ErrorMessage errorMessage={addItemErrMessage} />
					)}
				</div>
			</section>
			<section className="flex flex-col my-20">
				<form
					method="post"
					onSubmit={sendInvite}
					className="flex flex-col text-base sm:text-lg"
				>
					{/* <label
						htmlFor="email"
						className="my-8 text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2"
					>
						SHARE THE LIST
					</label> */}
					<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8">
						SHARE THE LIST
					</h2>
					<div className="flex flex-col sm:flex-row gap-4 text-base sm:text-2xl">
						<input
							aria-label="Share the list"
							type="email"
							name="email"
							id="email"
							placeholder="Share this list with another user"
							className="grow shrink bg-offWhite border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple"
							onChange={() => setShareListErrMessage('')}
						></input>
						<button
							type="submit"
							className="bg-offWhite  text-darkPurple border border-darkPurple flex justify-center items-center shadow-lg rounded-md transition ease-in-out hover:bg-darkPurple px-4 py-2 gap-6 shrink-0"
						>
							<span>
								<i class="fa-solid fa-share-nodes"></i>
							</span>
							Share
						</button>
					</div>
				</form>
				{shareListErrMessage !== '' && (
					<ErrorMessage errorMessage={shareListErrMessage} />
				)}
			</section>
		</div>
	);
}
