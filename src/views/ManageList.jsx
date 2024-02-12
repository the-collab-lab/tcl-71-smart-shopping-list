import { addItem } from '../api/firebase';

export function ManageList() {
	function handleSubmit(e) {
		/*preventing the browser of refreshing and clearing input*/
		e.preventDefault();

		/*read form*/
		const form = e.target;
		const formData = new FormData(form);

		addItem(formData);
		console.log(addItem(formData));
		let item = formData.get('item');
		let time = formData.get('time');
		console.log(item, time);
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
					<option value="soon">Soon-7days</option>
					<option value="soonIsh">Soon-ish-14days</option>
					<option value="notSoon">Not soon-30</option>
				</select>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
