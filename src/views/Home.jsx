import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import ListForm from '../components/ListForm';
import ErrorMessage from '../components/ErrorMessage';

export function Home({ data, setListPath, userId, userEmail }) {
	const [message, setMessage] = useState('');

	return (
		<div className="Home">
			{!!data[0] ? (
				<>
					<h3>My lists</h3>
					<ul>
						{data.map((list, i) => (
							<SingleList
								key={i}
								name={list.name}
								path={list.path}
								setListPath={setListPath}
								userId={userId}
								userEmail={userEmail}
							/>
						))}
					</ul>
					<h3>Create a new list</h3>
				</>
			) : (
				<h3>Start creating a new list</h3>
			)}

			<div className="Home__form">
				<ListForm
					setMessage={setMessage}
					setListPath={setListPath}
					userId={userId}
					userEmail={userEmail}
				/>
				{message !== '' && <ErrorMessage errorMessage={message} />}
			</div>
		</div>
	);
}
