import { SingleList } from '../components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListForm from '../components/ListForm';
import ErrorMessage from '../components/ErrorMessage';

export function Home({ data, setListPath, userId, userEmail }) {
	const { t } = useTranslation();

	const [message, setMessage] = useState('');

	return (
		<div className="pt-16 pb-24 mx-auto max-w-xl flex flex-col text-center text-darkPurple font-poppins px-4">
			<h1 className="font-amiri text-2xl sm:text-3xl mb-10">
				{t('AllMyLists')}
			</h1>
			<p className="mb-16 text-xl sm:text-2xl">
				{data[0] ? t('MessageSelectOrCreateList') : t('MessageCreateList')}
			</p>

			{data[0] && (
				<section className="mb-8">
					<h2 className="text-lg sm:text-xl text-left text-darkPurple border-solid border-darkPurple border-b pb-2 mb-8">
						{t('SelectAList')}
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
					{t('CreateNewList')}
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
