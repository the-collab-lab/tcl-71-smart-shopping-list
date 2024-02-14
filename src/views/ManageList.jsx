import { addItem } from '../api/firebase';

export function ManageList({ listPath }) {
	async function handleSubmit(e) {
		/*preventing the browser of refreshing and clearing input*/
		e.preventDefault();

		/*read form*/
		const form = e.target;
		const formData = new FormData(form);

		let itemName = formData.get('item');
		let time = formData.get('time');

		/*
		The user’s soon/not
		soon/kind of soon choice is used to calculate
		nextPurchasedDate
		*/
		let daysUntilNextPurchase;
		if (time === 'soon') {
			daysUntilNextPurchase = 7;
		} else if (time === 'soonIsh') {
			daysUntilNextPurchase = 14;
		} else {
			daysUntilNextPurchase = 30;
		}

		// We make the call to the database through addItem utility function and await response
		let response = await addItem(listPath, { itemName, daysUntilNextPurchase });

		/*successfully or not sucessfully added to the server*/
		if (response) {
			alert(`${itemName} added to the list!`);
		} else {
			alert(`${itemName} couldn't be added to the list...`);
		}

		form.reset();
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
		</>
	);
}
