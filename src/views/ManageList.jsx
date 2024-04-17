import { useState } from 'react';
import { addItem } from '../api/firebase';
import { shareList } from '../api/firebase';
import ErrorMessage from '../components/ErrorMessage';
import Message from '../components/Message';
import {
	inputHasValue,
	inputHasOnlyNUmbers,
	stringsHaveSameValue,
} from '../utils/inputValidation';

export function ManageList({ data, listPath, userId, userEmail }) {
	const [addItemErrMessage, setAddItemErrMessage] = useState('');
	const [shareListErrMessage, setShareListErrMessage] = useState('');
	const [addItemMessage, setAddItemMessage] = useState('');
	const [shareListMessage, setShareListMessage] = useState('');

	let displayName;
	
	for (let i = 0; i < listPath.length; i++) {
		if (listPath[i] === '/') {
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
			setAddItemMessage(`${itemName} added to the list!`);
		} else {
			setAddItemMessage(`${itemName} couldn't be added to the list...`);
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

	const Responses = {
		Ok: 'ok',
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
			if (response.code === Responses.Ok) {
				setShareListMessage(shareListMessages[response.code]);
			} else {
				setShareListErrMessage(shareListMessages[response.code]);
			}
		}
		mailForm.reset();
	}

	return (
		<div className="pt-16 pb-24 mx-auto max-w-xl flex flex-col text-center items-center text-darkPurple font-poppins px-4">
			<h1 className="font-amiri text-2xl sm:text-3xl text-darkPurple mb-10">
				{displayName[0].toUpperCase() + displayName.slice(1)}
			</h1>
			<div className="mx-auto py-8">
				<p className="pb-12 text-darkPurple font-poppins text-xl sm:text-2xl">
					Add new items and share your list with other users
				</p>
			</div>
			<section className="flex flex-col w-full min-h-80 sm:min-h-72">
				<div className="flex flex-col">
					<form
						method="post"
						onSubmit={handleSubmit}
						className="flex flex-col text-base sm:text-lg"
					>
						<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8">
							ADD A NEW ITEM
						</h2>

						<input
							aria-label="Add a new item"
							type="text"
							placeholder="Type a new item name"
							name="item"
							className="grow shrink bg-lightGrey border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple mb-5"
							onChange={() => {
								setAddItemErrMessage('');
								setAddItemMessage('');
							}}
						></input>
						<div className="grid sm:grid-cols-3 grid-cols-1 grid-rows-2 sm:grid-rows-1  gap-y-4 sm:gap-x-2  text-base sm:text-lg">
							<select
								name="time"
								id="time-select "
								aria-label="When do you need this item?"
								className="col-span-3 sm:col-span-2 bg-lightGrey text-base sm:text-lg border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple"
							>
								<option value="none" selected disabled hidden>
									Choose item's likely need date
								</option>

								<option value="soon">Soon (within 7 days)</option>
								<option value="soonIsh">Soon-ish (in 14 days)</option>
								<option value="notSoon">Not soon (in 30 days)</option>
							</select>
							<button
								type="submit"
								className=" col-span-3 sm:col-span-1 gap-6 flex items-center text-base sm:text-lg justify-center shadow-lg rounded-md bg-lightPurple hover:bg-hoverPurple text-offWhite transition ease-in-out px-4 py-2"
							>
								<span>
									<i className="fa-solid fa-plus"></i>
								</span>
								Add
							</button>
						</div>
					</form>
					{addItemErrMessage !== '' && (
						<ErrorMessage errorMessage={addItemErrMessage} />
					)}
					{addItemMessage !== '' && <Message message={addItemMessage} />}
				</div>
			</section>
			<section className="flex flex-col w-full min-h-72 sm:min-h-52">
				<form
					method="post"
					onSubmit={sendInvite}
					className="flex flex-col text-base sm:text-lg"
				>
					<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8">
						SHARE THE LIST
					</h2>
					<div className="grid sm:grid-cols-3 grid-cols-1 grid-rows-2 sm:grid-rows-1  gap-y-4 sm:gap-x-2 text-base sm:text-lg">
						<input
							aria-label="Share the list"
							type="email"
							name="email"
							id="email"
							placeholder="Share this list with another user"
							className="col-span-3 sm:col-span-2 bg-lightGrey border border-darkPurple rounded-md shadow-lg px-4 py-2 placeholder:text-darkPurple"
							onChange={() => {
								setShareListErrMessage('');
								setShareListMessage('');
							}}
						></input>
						<button
							type="submit"
							className="col-span-3 sm:col-span-1 flex bg-lightGrey text-darkPurple border border-darkPurple justify-center items-center shadow-lg rounded-md transition ease-in-out hover:bg-hoverPurple hover:text-puurWhite px-4 py-2 gap-6 shrink-0"
						>
							<span>
								<i className="fa-solid fa-share-nodes"></i>
							</span>
							Share
						</button>
					</div>
				</form>
				{shareListErrMessage !== '' && (
					<ErrorMessage errorMessage={shareListErrMessage} />
				)}
				{shareListMessage !== '' && <Message message={shareListMessage} />}
			</section>
		</div>
	);
}
