import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: {
			//layout page
			DescriptionDespiensa:
				'Simplify your shopping with <1>Despiensa</1>, the intuitive list organizer.',
			SignIn: 'Sign in to start',
			BuiltBy: 'Built by',
			And: 'and',

			// home page
			AllMyLists: 'All My Lists',
			SelectAList: 'SELECT A LIST',
			CreateNewList: 'CREATE A NEW LIST',
			MessageSelectOrCreateList:
				'Select the list you need to use today or create a new one.',
			MessageCreateList: 'Start by creating a list.',
			ButtonCreateList: 'Create List',
			InputTypeNewListName: 'type a new list name',
			errorCreatingListFailed: 'There was an error creating the list',
			errorCreatingListEmpty: 'Please type a list name :)',
			errorCreatingListExistingName: 'A List with this name already exists',

			// navbar
			NavbarList: 'List',
			NavbarManageList: 'Manage List',
			NavbarSignOut: 'Sign out',

			// list page
			MessageNoItem1: 'This is your new list. There are no items added yet...',
			MessageNoItem2:
				'You can now add items, specify when you need to purchase them,and/or share the list with other users',
			Overdue: 'Overdue',
			BuySoon: 'Buy Soon',
			BuySoonish: 'Buy Soonish',
			BuyNotSoon: 'BuyNotSoon',
			Inactive: 'Inactive',
		},
	},
	fr: {
		translation: {
			//layout page
			DescriptionDespiensa:
				'Facilitez vous la vie avec <1>Despiensa</1>, votre liste de course intuitive.',
			SignIn: 'Inscrivez vous pour demarrer',
			BuiltBy: 'Creer par',
			And: 'et',
			// home page
			AllMyLists: 'Toutes Mes Listes',
			SelectAList: 'CHOISISSEZ UNE LISTE',
			CreateNewList: 'CREEZ UNE NOUVELLE LISTE',
			MessageSelectOrCreateList:
				'Selectionnez une liste, ou creer une nouvelle',
			MessageCreateList: 'Commencez par creer une liste.',
			ButtonCreateList: 'Creer une liste',
			InputTypeNewListName: 'Entrer le nom de la future liste',
			errorCreatingListFailed:
				'Une error s est produite lors de la creation de la liste.',
			errorCreatingListEmpty: 'Merci d entrer le nom de la liste :)',
			errorCreatingListExistingName: 'Une liste avec ce nom existe deja.',

			// navbar
			NavbarList: 'Liste',
			NavbarManageList: 'Gerer Liste',
			NavbarSignOut: 'Deconnection',

			// list page
			MessageNoItem1:
				'Voici votre nouvelle liste. Elle ne contient pas encore d elements...',
			MessageNoItem2:
				'Ajoutez y des elements, indiquez quand vous souhaites l acheter, et/ou partager la avec d autres',
			Overdue: 'En retard',
			BuySoon: 'À acheter sous peu',
			BuySoonish: 'À acheter bientôt',
			BuyNotSoon: 'À acheter plus tard',
			Inactive: 'Inactif',
		},
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.use(LanguageDetector)
	.init({
		debug: true,
		resources,
		fallbackLng: 'en',
		//lng: 'fr', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
