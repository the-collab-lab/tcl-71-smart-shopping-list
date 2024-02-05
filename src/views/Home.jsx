import './Home.css';
import { SingleList } from '../components';

export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{data.map((list, i) => {
					<SingleList
						name={list.name}
						path={list.path}
						setListPath={setListPath}
					/>;
				})}
			</ul>
		</div>
	);
}
