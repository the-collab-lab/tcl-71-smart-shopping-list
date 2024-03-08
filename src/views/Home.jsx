import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import ListForm from '../components/ListForm';
import ErrorMessage from '../components/ErrorMessage';

export function Home({ data, setListPath, userId, userEmail }) {
	const [message, setMessage] = useState('');

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<div className="Home__form">
				<ListForm
					setMessage={setMessage}
					setListPath={setListPath}
					userId={userId}
					userEmail={userEmail}
				/>
				{message !== '' && <ErrorMessage errorMessage={message} />}
			</div>
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
