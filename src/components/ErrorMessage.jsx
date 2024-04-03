const ErrorMessage = ({ errorMessage }) => {
	return (
		<p className="text-alertRed mt-10 text-base sm:text-lg">{errorMessage}</p>
	);
};

export default ErrorMessage;
