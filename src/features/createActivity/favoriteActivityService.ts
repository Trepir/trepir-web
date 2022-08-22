export const BASE_URL = 'https://trepir.herokuapp.com/';

export const updateFavoriteActivity = async (
	uid: string,
	activityId: string
) => {
	try {
		const activityToFavorite = {
			activityId,
			uid,
		};

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
	tripId: string
) => {
	try {
		const activityToAddToTrip = {
			activityId,
			uid,
			tripId,
		};

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
};
