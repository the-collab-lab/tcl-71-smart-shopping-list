const ErrorMessage = ({ errorMessage }) => {
	return (
		<p className="italic text-alertRed mt-5 mb-4 text-base sm:text-lg border-alertRed border-2 rounded-md px-4 py-2 shadow-lg">
			{errorMessage}
		</p>
	);
};

export default ErrorMessage;
