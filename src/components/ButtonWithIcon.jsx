export function ButtonWithIcon({ text, handleClick, icon }) {
	return (
		<button
			onClick={handleClick}
			className="flex flex-row lg:pr-12 lg:pt-0 pt-6 font-poppins text-lg "
		>
			{icon}
			{text}
		</button>
	);
}
