import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: {
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
			NavbarList: 'List',
			NavbarManageList: 'Manage List',
			NavbarSignOut: 'Sign out',
		},
	},
	fr: {
		translation: {
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
			NavbarList: 'Liste',
			NavbarManageList: 'Gerer Liste',
			NavbarSignOut: 'Deconnection',
		},
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'fr', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
