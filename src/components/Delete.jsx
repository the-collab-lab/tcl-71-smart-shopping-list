import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Confirm from '@/components/ui/confirm-comp';

const RemoveStudent = ({ studentId, studentEmail }) => {
	const params = useParams();
	const router = useRouter();
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const openConfirm = () => {
		setIsConfirmOpen(true);
	};
	const closeConfirm = () => {
		setIsConfirmOpen(false);
	};

	const handleRemoveStudent = async () => {
		setIsSubmitted(true);
		const submit = await fetch(`/api/courses/${params.course}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				updateType: 'removeStudent',
				studentId: studentId,
			}),
		});
		router.refresh();
	};

	return (
		<>
			<button
				onClick={openConfirm}
				aria-label={`Echar a ${studentEmail}`}
				title={`Echar a ${studentEmail}`}
				className="button button--danger"
			></button>
			<Confirm
				title="Echar Estudiante"
				onClose={closeConfirm}
				onConfirm={handleRemoveStudent}
				open={isConfirmOpen}
				loading={isSubmitted}
			>
				¿Seguro que quieres echar a {studentEmail}?
			</Confirm>
		</>
	);
};

export default RemoveStudent;
