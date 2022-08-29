export const BASE_URL = 'https://trepir.herokuapp.com/';

export const updateFavoriteActivity = async (
	uid: string,
	activityId: string
) => {
	const activityToFavorite = {
		activityId,
		uid,
	};
	try {
		const newFavoriteActivity = await fetch(`${BASE_URL}activity/favorite`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(activityToFavorite),
		});
		const jsonNewFavoriteActivity = await newFavoriteActivity.json();
		return jsonNewFavoriteActivity;
	} catch (e) {
		console.log(e);
		return e;
	}
};

export const saveActivityToTrip = async (
	uid: string,
	activityId: string,
	tripId: string,
	favoriteList: string[]
) => {
	const activityToAddToTrip = {
		activityId,
		uid,
		tripId,
	};
	if (favoriteList.includes(activityToAddToTrip.activityId)) {
		try {
			await fetch(`${BASE_URL}activity/favorite`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ activityId, uid }),
			});
			const activitySavedToTrip = await fetch(`${BASE_URL}activity/favorite`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(activityToAddToTrip),
			});
			const jsonActivitySavedToTrip = await activitySavedToTrip.json();
			return jsonActivitySavedToTrip;
		} catch (e) {
			console.log(e);
			return e;
		}
	} else {
		try {
			const activitySavedToTrip = await fetch(`${BASE_URL}activity/favorite`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(activityToAddToTrip),
			});
			const jsonActivitySavedToTrip = await activitySavedToTrip.json();
			return jsonActivitySavedToTrip;
		} catch (e) {
			console.log(e);
			return e;
		}
	}
};

export const getUserFavoriteActivities = async (uid: string) => {
	try {
		const userFavoriteActivities = await fetch(
			`${BASE_URL}activity/favoriteActivities`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ uid }),
			}
		);

		const jsonUserFavoriteActivities = await userFavoriteActivities.json();
		return jsonUserFavoriteActivities;
	} catch (e) {
		console.log(e);
		return e;
	}
};
