import { addItem } from '../api/firebase';
import { getFutureDate } from '../utils';

export function ManageList() {
	function handleSubmit(e) {
		/*preventing the browser of refreshing and clearing input*/
		e.preventDefault();

		/*read form*/
		const form = e.target;
		const formData = new FormData(form);

		let item = formData.get('item');
		let time = formData.get('time');
		console.log(item, time);

		/*
		The user’s soon/not 
		soon/kind of soon choice is used to calculate 
		nextPurchasedDate
		*/
		let days;
		if (time === 'soon') {
			days = 7;
		} else if (time === 'soonIsh') {
			days = 14;
		} else {
			days = 30;
		}

		addItem(formData, { item });
		console.log(addItem(formData, { item }));

		/*successfully or not sucessfully added to the server
		- code still to be implemented*/
		let success;
		alert(`${item} has been added ${success} to the server`);
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
				<select name="time">
					<option value="soon">Soon</option>
					<option value="soonIsh">Soon-ish</option>
					<option value="notSoon">Not soon</option>
				</select>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
