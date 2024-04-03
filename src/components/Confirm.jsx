import { useEffect, useRef } from 'react';
import Loading from './Loading';

const Confirm = ({ open, onClose, onConfirm, children, title, loading }) => {
	const confirmRef = useRef(null);
	const cancelRef = useRef(null);

	// Opens/closes modal depending on open state
	useEffect(() => {
		const { current: el } = confirmRef;
		if (open) {
			el.showModal();
			cancelRef.current.focus();
		} else el.close();
	}, [open]);

	return (
		<dialog
			className="rounded-md shadow-lg bg-puurWhite text-darkPurple"
			ref={confirmRef}
			onClose={onClose}
		>
			<div className="flex flex-col p-8 gap-8">
				<h1 className="text-2xl sm:text-3xl">{title}</h1>

				{loading ? (
					<Loading />
				) : (
					<>
						{children}
						<div className="flex justify-center content-center flex-wrap gap-4 sm:gap8">
							<button
								onClick={onConfirm}
								aria-label="Confirm"
								className="flex items-center justify-center cursor-pointer bg-lightPurple hover:bg-hoverPurple transition ease-in-out rounded-md text-base sm:text-lg text-puurWhite px-4 py-2 gap-6 shadow-lg min-w-36 sm:min-w-40"
							>
								<i className="fa-solid fa-check"></i>
								Confirm
							</button>
							<button
								onClick={onClose}
								aria-label="Cancel"
								ref={cancelRef}
								className="flex items-center justify-center cursor-pointer border-2 border-darkPurple hover:border-hoverPurple hover:bg-hoverPurple transition ease-in-out rounded-md text-base sm:text-lg text-darkPurple hover:text-puurWhite px-4 py-2 gap-6 shadow-lg min-w-36 sm:min-w-40"
							>
								<i className="fa-solid fa-x"></i>
								Cancel
							</button>
						</div>
					</>
				)}
			</div>
		</dialog>
	);
};

export default Confirm;
