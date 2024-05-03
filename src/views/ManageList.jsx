import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
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
	const { t } = useTranslation();

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

		const itemAddedSuccess = (
			<Trans i18nKey="ItemAddedToList" itemName={itemName}>
				{{ itemName }} added to the list!
			</Trans>
		);

		const itemAddedFailed = (
			<Trans i18nKey="ItemNotAddedToList" itemName={itemName}>
				{{ itemName }} couldn t be added to the list...
			</Trans>
		);

		if (!inputHasValue(itemName) || inputHasOnlyNUmbers(itemName)) {
			setAddItemErrMessage(t('MessagePleaseEnterItem'));
			form.reset();
			return;
		}

		if (data.some((item) => stringsHaveSameValue(item.name, itemName))) {
			setAddItemErrMessage(t('MessageItemAlreadyInList'));
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
			setAddItemMessage(itemAddedSuccess);
		} else {
			setAddItemMessage(itemAddedFailed);
		}

		form.reset();
	}

	const createShareListMessages = (recipientEmail) => {
		const messageOk = (
			<Trans i18nKey="MessageOk" recipientEmail={recipientEmail}>
				The list has been shared with {{ recipientEmail }}!
			</Trans>
		);
		const messageMissing = (
			<Trans i18nKey="MessageMissing" recipientEmail={recipientEmail}>
				It seems like {{ recipientEmail }} isn't a valid user email.
			</Trans>
		);
		const messageExisting = (
			<Trans i18nKey="MessageExisting" recipientEmail={recipientEmail}>
				The list is already shared with {{ recipientEmail }}.
			</Trans>
		);

		return {
			ok: messageOk,
			missing: messageMissing,
			existing: messageExisting,
			invalidEmail: t('MessageInvalidEmail'),
			repeatedEmail: t('MessageRepeatedEmail'),
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
					{t('MessageAddItems')}
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
							{t('AddItem')}
						</h2>

						<input
							aria-label="Add a new item"
							type="text"
							placeholder={t('InputTypeNewItem')}
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
									{t('ChooseDate')}
								</option>

								<option value="soon">{t('Soon')}</option>
								<option value="soonIsh">{t('Soonish')}</option>
								<option value="notSoon">{t('NotSoSoon')}</option>
							</select>
							<button
								type="submit"
								className=" col-span-3 sm:col-span-1 gap-6 flex items-center text-base sm:text-lg justify-center shadow-lg rounded-md bg-lightPurple hover:bg-hoverPurple text-offWhite transition ease-in-out px-4 py-2"
							>
								<span>
									<i className="fa-solid fa-plus"></i>
								</span>
								{t('Add')}
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
						{t('ShareListUppercase')}
					</h2>
					<div className="grid sm:grid-cols-3 grid-cols-1 grid-rows-2 sm:grid-rows-1  gap-y-4 sm:gap-x-2 text-base sm:text-lg">
						<input
							aria-label="Share the list"
							type="email"
							name="email"
							id="email"
							placeholder={t('InputShareList')}
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
							{t('Share')}
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
