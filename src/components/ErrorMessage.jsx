import './ErrorMessage.css';

const ErrorMessage = (props) => {
	return (
		<div className="errorMessage">
			{props.errorMessage !== '' ? <p>{props.errorMessage}</p> : <></>}
		</div>
	);
};

export default ErrorMessage;
