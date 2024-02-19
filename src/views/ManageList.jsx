import { addItem } from '../api/firebase';
import { shareList } from '../api/firebase';

export function ManageList({ listPath, userId }) {
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
		console.log(e.target);
		console.log(mailForm);
		const mailFormData = new FormData(mailForm);

		let email = mailFormData.get('email');

		let invite = await shareList(listPath, { email });

		if (email) {
			alert(`${email} has been shared the list!`);
		} else {
			alert(`${email} does not exist`);
		}
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
					<input type="email" name="email"></input>
				</label>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
