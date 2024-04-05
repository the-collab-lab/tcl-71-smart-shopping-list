import { SingleList } from '../components';
import { useState } from 'react';
import ListForm from '../components/ListForm';
import ErrorMessage from '../components/ErrorMessage';

export function Home({ data, setListPath, userId, userEmail }) {
	const [message, setMessage] = useState('');

	return (
		<div className="pt-16 pb-24 mx-auto max-w-xl flex flex-col text-center text-darkPurple font-poppins px-4">
			<h1 className="font-amiri text-2xl sm:text-3xl mb-10">All My Lists</h1>
			<p className="mb-16 text-xl sm:text-2xl">
				{data[0]
					? 'Select the list you need to use today or create a new one.'
					: 'Start by creating a list.'}
			</p>

			{data[0] && (
				<section className="mb-8">
					<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8">
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

			<section className="min-h-72 sm:min-h-52">
				<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8 ">
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
