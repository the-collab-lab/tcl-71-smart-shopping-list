import { addItem } from '../api/firebase';

export function ManageList() {
	function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		/*addItem*/ console.log(formData);
		let item;
		let time;
		for (let data of formData.entries()) {
			console.log(data);
			if (data[0] === 'item') {
				item = data[1];
			} else {
				time = data[1];
			}
		}
		console.log(item, time);
		alert(`${item} needs to be bought ${time}`);
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
