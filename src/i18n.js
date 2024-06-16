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

			// list buttons component
			AddItem: 'Add item',
			ShareList: 'Share list',

			// searchList component
			SearchItem: 'Search an item',

			// manage list page
			MessageAddItems: 'Add new items and share your list with other users',
			AddItemTitle: 'ADD A NEW ITEM',
			InputTypeNewItem: 'Type a new item name',
			ChooseDate: 'Choose item s likely need date',
			Soon: 'Soon (within 7 days)',
			Soonish: 'Soon-ish (in 14 days)',
			NotSoSoon: 'Not soon (in 30 days)',
			Add: 'Add',
			ShareListUppercase: 'SHARE THE LIST',
			InputShareList: 'Share this list with another user',
			Share: 'Share',
			MessagePleaseEnterItem: 'Please enter an item',
			MessageItemAlreadyInList: 'This item is already in your list',
			ItemAddedToList: '{{itemName}} added to the list!',
			ItemNotAddedToList: '{{itemName}} couldn t be added to the list...',
			MessageOk: 'The list has been shared with {{recipientEmail}}!',
			MessageMissing:
				'It seems like {{recipientEmail}} isn t a valid user email',
			MessageExisting: 'The list is already shared with {{recipientEmail}}.',
			MessageInvalidEmail: 'Share the list by entering a valid user email',
			MessageRepeatedEmail:
				'To share the list, enter the email of a user that is not you',

			// deleteItem component
			ModalDeleteItemTitle: 'Delete {{itemNameUppercase}}',
			ModalDeleteItemText:
				'Do you really want to delete {{itemNameUppercase}} from this list?',
			DeleteItemName: 'Delete {{itemName}}',

			// confirm component
			Confirm: 'Confirm',
			Cancel: 'Cancel',

			// deleteList component
			ButtonDeleteList: 'Delete {{listNameUppercase}}',
			ModalDeleteListTitle: 'Delete {{listNameUppercase}} List',
			ModalDeleteListConfirmSuppression:
				'Do you really want to delete {{listNameUppercase}} list?',
			ModalDeleteListStopUsing:
				'Do you really want to stop using {{listNameUppercase}} list?',
		},
	},
	fr: {
		translation: {
			//layout page
			DescriptionDespiensa:
				'Facilitez-vous la vie avec <1>Despiensa</1>, votre liste de course intuitive.',
			SignIn: 'Se connecter',
			BuiltBy: 'Créer par',
			And: 'et',

			// home page
			AllMyLists: 'Mes listes',
			SelectAList: 'CHOISISSEZ UNE LISTE',
			CreateNewList: 'CRÉEZ UNE NOUVELLE LISTE',
			MessageSelectOrCreateList:
				'Sélectionnez une liste, ou créez-en une nouvelle',
			MessageCreateList: 'Commencez par créer une liste.',
			ButtonCreateList: 'Créer une liste',
			InputTypeNewListName: 'Entrez un nouveau nom',
			errorCreatingListFailed:
				"Une error s'est produite lors de la création de la liste.",
			errorCreatingListEmpty: "Merci d'entrer un nom de liste :)",
			errorCreatingListExistingName: 'Une liste avec ce nom existe déjà.',

			// navbar
			NavbarList: 'Liste',
			NavbarManageList: 'Gérer Liste',
			NavbarSignOut: 'Déconnexion',

			// list page
			MessageNoItem1:
				'Voici votre nouvelle liste. Elle ne contient pas encore de produits.',
			MessageNoItem2:
				"Ajoutez-y des produits, indiquez quand vous souhaitez l'acheter, et/ou partagez votre liste.",
			Overdue: 'En retard',
			BuySoon: 'Sous peu',
			BuySoonish: 'Bientôt',
			BuyNotSoon: 'Plus tard',
			Inactive: 'Inactif',

			//list buttons component
			AddItem: 'Ajouter produit',
			ShareList: 'Partager',

			// searchList component
			SearchItem: 'Cherchez un produit',

			// manage list page
			MessageAddItems: 'Ajoutez un nouveau produit, ou partagez votre liste',
			AddItemTitle: 'AJOUTER UN PRODUIT',
			InputTypeNewItem: "Entrez le nom d'un produit",
			ChooseDate: 'Quand en aurez-vous besoin ?',
			Soon: 'Sous peu (sous 7 jours)',
			Soonish: 'Bientôt (sous 14 jours)',
			NotSoSoon: 'Plus tard (sous 30 jours)',
			Add: 'Ajouter',
			ShareListUppercase: 'PARTAGER LA LISTE',
			InputShareList: "Entrez l'email d'un utilisateur",
			Share: 'Partager',
			MessagePleaseEnterItem: "Entrez le nom d'un produit.",
			MessageItemAlreadyInList: 'Ce produit est déjà dans votre liste.',
			ItemAddedToList: '{{itemName}} a été ajouté a la liste !',
			ItemNotAddedToList: '{{itemName}} n a pas pu être ajouté à la liste...',
			MessageOk: 'La liste a été partagée avec {{recipientEmail}}!',
			MessageMissing:
				"L'adresse email {{recipientEmail}} n'est pas un utilisateur valide.",
			MessageExisting: 'La liste a déjà été partagée avec {{recipientEmail}}.',
			MessageInvalidEmail: 'Utilisez une adresse email valide.',
			MessageRepeatedEmail:
				'Partagez avec une adresse email autre que de la vôtre.',

			// deleteItem component
			ModalDeleteItemTitle: 'Supprimer {{itemNameUppercase}}',
			ModalDeleteItemText:
				'Souhaitez-vous définitivement supprimer {{itemNameUppercase}} de votre liste ?',
			DeleteItemName: 'Supprimer {{itemName}}',

			// confirm component
			Confirm: 'Confirmer',
			Cancel: 'Annuler',

			// deleteList component
			ButtonDeleteList: 'Supprimer {{listNameUppercase}}',
			ModalDeleteListTitle: 'Supprimer la liste {{listNameUppercase}}',
			ModalDeleteListConfirmSuppression:
				'Voulez-vous définitivement supprimer la liste {{listNameUppercase}} ?',
			ModalDeleteListStopUsing:
				"Voulez-vouz arrêter d'utiliser la liste {{listNameUppercase}} ?",
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

document.documentElement.lang = i18n.language;

export default i18n;
