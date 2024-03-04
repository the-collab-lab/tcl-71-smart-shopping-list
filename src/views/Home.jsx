import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import ListForm from '../components/ListForm';
import ErrorMessage from '../components/ErrorMessage';

export function Home({ data, setListPath, userId, userEmail }) {
	const [message, setMessage] = useState(null);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ListForm
				setMessage={setMessage}
				setListPath={setListPath}
				userId={userId}
				userEmail={userEmail}
			/>
			<ErrorMessage errorMessage={message} />
			<ul>
				{data.map((list, i) => (
					<SingleList
						key={i}
						name={list.name}
						path={list.path}
						setListPath={setListPath}
					/>
				))}
			</ul>
		</div>
	);
}
