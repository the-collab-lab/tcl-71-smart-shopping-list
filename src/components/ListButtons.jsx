import { useNavigate } from 'react-router-dom';
const ListButtons = () => {
	const navigate = useNavigate();
	return (
		<div className="grid grid-cols-3 gap-x-2 py-6">
			<button
				className="flex items-center justify-center bg-lightPurple rounded-lg col-span-2 py-5"
				onClick={() => navigate('/manage-list')}
			>
				<i class="fa-solid fa-plus fa-inverse"></i>

				<span className="ps-2 text-lg text-offWhite font-poppins">
					Add item
				</span>
			</button>
			<button
				className="flex items-center justify-center bg-white border rounded-lg col-span-1 text-darkPurple"
				onClick={() => navigate('/manage-list')}
			>
				<i class="fa-solid fa-share-nodes"></i>

				<span className="ps-2 text-lg text-darkPurple font-poppins">
					Share list
				</span>
			</button>
		</div>
	);
};

export default ListButtons;
