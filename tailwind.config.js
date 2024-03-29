/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'] /* text*/,
			amiri: ['Amiri', 'serif'] /* title & app name*/,
		},
		colors: {
			darkPurple: '#474666' /* for text and border light buttons */,
			puurWhite: '#FFFFFF' /* for text in buttons and background*/,
			lightGrey: '#FCFCFD' /* background items */,
			offWhite: '#FCFAFA' /* background header & footer */,
			lightRurple: '#6966A8' /* background buttons & checkout boxes */,
			alertRed: '#d52c2c' /* alert */,
		},
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			xl2: '1536px',
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
};
