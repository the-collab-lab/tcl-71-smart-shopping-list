import { SingleList } from '../components';
import { useState } from 'react';
import ListForm from '../components/ListForm';
import ErrorMessage from '../components/ErrorMessage';

export function Home({ data, setListPath, userId, userEmail }) {
	const [message, setMessage] = useState('');

	return (
		<div className="mx-auto max-w-2xl flex flex-col text-center">
			<h1 className="font-amiri text-4xl mb-10">All My Lists</h1>
			<p className="mb-20 text-3xl">
				{data[0]
					? 'Select the list you need to use today or create a new one'
					: 'Start by creating a list'}
			</p>

			{data[0] && (
				<section className="mb-20">
					<h2 className="text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-12">
						SELECT A LIST
					</h2>
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
				</section>
			)}

			<section>
				<h2 className="text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-10">
					CREATE A NEW LIST
				</h2>
				<ListForm
					setMessage={setMessage}
					setListPath={setListPath}
					userId={userId}
					userEmail={userEmail}
					data={data}
				/>
				{message && <ErrorMessage errorMessage={message} />}
			</section>
		</div>
	);
}
