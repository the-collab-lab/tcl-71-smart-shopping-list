import {
	addDoc,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getDaysBetweenDates, getFutureDate } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					// We keep the list's id and path so we can use them later.
					return { name: listRef.id, path: listRef.path };
				});
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);
	const [isLoadingListData, setIsLoadingListData] = useState(false);

	useEffect(() => {
		if (!listPath) return;
		setIsLoadingListData(true);

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setIsLoadingListData(false);
			setData(nextData);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return { data, isLoadingListData };
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});
	return listDocRef;
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(listPath, currentUserId, recipientEmail) {
	// Check if current user is owner.
	if (!listPath.includes(currentUserId)) {
		return;
	}

	// Get the document for the recipient user.
	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));

	// If the recipient user doesn't exist, we can't share the list.
	if (!recipientDoc.exists()) {
		return { code: 'missing' };
	}

	const listDocumentRef = doc(db, listPath);
	const userDocumentRef = doc(db, 'users', recipientEmail);
	const userLists = (await getDoc(userDocumentRef)).data().sharedLists;

	// Check if list is already in recipient user's sharedLists array
	if (userLists.some((list) => list.path === listPath)) {
		return { code: 'existing' };
	}

	// Add the list to the recipient user's sharedLists array.
	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocumentRef),
	});
	return { code: 'ok' };
}

/**
 * Delete a user's list only if the current user is the list owner.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the current user.
 * @param {string} listPath The path of the list to delete.
 * @param {string} listId The id of the list to delete.
 */
export async function deleteList(
	userId,
	userEmail,
	listPath,
	listId,
	setOpen,
	setSubmitted,
) {
	// Check if current user is owner.
	if (!listPath.includes(userId)) {
		const usersCollectionRef = collection(db, 'users');
		const userDocumentRef = doc(usersCollectionRef, userEmail);
		const userSharedLists = (await getDoc(userDocumentRef)).data().sharedLists;

		// Remove list reference from user's sharedLists array
		await updateDoc(userDocumentRef, {
			sharedLists: userSharedLists.filter((list) => list.path !== listPath),
		});
		// setOpen(false);
		// setSubmitted(false);
		return;
	}

	// Delete list doc
	const listCollectionRef = collection(db, userId);
	const listDocumentRef = doc(listCollectionRef, listId);
	await deleteDoc(listDocumentRef);

	// Update users doc that include a list reference
	const q = query(
		collection(db, 'users'),
		where('sharedLists', 'array-contains', listDocumentRef),
	);
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach(async (d) => {
		await updateDoc(doc(db, 'users', d.data().email), {
			sharedLists: d
				.data()
				.sharedLists.filter((list) => list.path !== listPath),
		});
	});
	// setOpen(false);
	// setSubmitted(false);
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listPath, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listPath, 'items');

	return addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

export async function updateItem(listPath, itemId) {
	const listCollectionRef = collection(db, listPath, 'items');
	const itemDocumentRef = doc(listCollectionRef, itemId);
	const item = await getDoc(itemDocumentRef);
	const itemTotalPurchases = item.data().totalPurchases;
	const dateLastPurchased = item.data().dateLastPurchased?.toDate();
	const dateCreated = item.data().dateCreated.toDate();
	const dateNextPurchased = item.data().dateNextPurchased.toDate();
	const now = new Date();
	const daysSinceLastPurchase = getDaysBetweenDates(
		now,
		dateLastPurchased ? dateLastPurchased : dateCreated,
	);
	const prevEstimate = dateLastPurchased
		? getDaysBetweenDates(dateNextPurchased, dateLastPurchased)
		: getDaysBetweenDates(dateNextPurchased, dateCreated);
	const nextEstimate = calculateEstimate(
		prevEstimate,
		dateLastPurchased ? daysSinceLastPurchase : prevEstimate,
		itemTotalPurchases,
	);

	await updateDoc(itemDocumentRef, {
		dateLastPurchased: now,
		dateNextPurchased: getFutureDate(nextEstimate),
		totalPurchases: itemTotalPurchases + 1,
	});

	return itemDocumentRef;
}

/**
 * Delete an item from user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {string} itemId The id of the item.
 */
export async function deleteItem(listPath, itemId) {
	const listCollectionRef = collection(db, listPath, 'items');
	const itemDocumentRef = doc(listCollectionRef, itemId);

	await deleteDoc(itemDocumentRef);
}

export function comparePurchaseUrgency(data) {
	const dayItemIsInactive = -60;
	const dayOfExpectedPurchase = 0;
	const dayItemIsBuySoon = 7;
	const dayItemIsBuySoonish = 14;

	const now = new Date();
	const newData = data.map((item) => {
		const daysBeforePurchase = getDaysBetweenDates(
			item.dateNextPurchased.toDate(),
			now,
		);

		item.daysBeforePurchase = daysBeforePurchase;

		if (daysBeforePurchase < dayItemIsInactive) {
			item.category = 'Inactive';
		} else if (
			daysBeforePurchase >= dayItemIsInactive &&
			daysBeforePurchase < dayOfExpectedPurchase
		) {
			item.category = 'Overdue';
		} else if (
			daysBeforePurchase >= dayOfExpectedPurchase &&
			daysBeforePurchase <= dayItemIsBuySoon
		) {
			item.category = 'Buy Soon';
		} else if (
			daysBeforePurchase > dayItemIsBuySoon &&
			daysBeforePurchase <= dayItemIsBuySoonish
		) {
			item.category = 'Buy Soonish';
		} else {
			item.category = 'Buy Not Soon';
		}

		return item;
	});

	const dataSortedByDaysLeft = newData.sort((itemA, itemB) => {
		if (itemA.daysBeforePurchase === itemB.daysBeforePurchase) {
			return itemA.name.localeCompare(itemB.name);
		}

		return itemA.daysBeforePurchase - itemB.daysBeforePurchase;
	});
	return dataSortedByDaysLeft;
}
