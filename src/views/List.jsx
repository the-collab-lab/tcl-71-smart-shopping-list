import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import SearchList from '../components/SearchList';
import { useParams } from 'react-router-dom';

export function List({ data }) {
	const [newList, setNewList] = useState([]);
	const { path } = useParams();

	useEffect(() => {
		setNewList(data);
	}, [data]);

	return (
		<>
			<h2>
				You are on the <code>{path}</code> list!
			</h2>
			<SearchList data={data} setNewList={setNewList} />
			<div>
				{newList?.length === 0 ? (
					<></>
				) : (
					<ul>
						{newList?.map((item) => (
							<ListItem key={item.id} name={item.name} />
						))}
					</ul>
				)}
			</div>
		</>
	);
}
