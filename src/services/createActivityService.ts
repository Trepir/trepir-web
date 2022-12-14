import { getLatLng } from 'use-places-autocomplete';

export const BASE_URL = 'https://trepir.herokuapp.com/';

export const createActivity = async (
	data: any,
	activityInput: any,
	uid: string
) => {
	const { activityName, activityDescription, durationHours, durationMinutes } =
		data;
	const photoUrl = await activityInput.location.photos[0].getUrl();
	const { lat, lng } = await getLatLng(activityInput.location);
	/* eslint-disable-next-line */
	const { formatted_address, name, place_id } = activityInput.location;

	const formattedDuration = Math.floor(durationHours * 60 + durationMinutes);

	const formattedActivity = {
		name: activityName,
		description: activityDescription,
		duration: formattedDuration,
		imageUrl: photoUrl,
		tags: activityInput.tag,
		location: {
			/* eslint-disable-next-line */
			formattedAddress: formatted_address,
			/* eslint-disable-next-line */
			country: formatted_address,
			/* eslint-disable-next-line */
			googleId: place_id,
			latitude: lat,
			longitude: lng,
			locationName: name,
			photoUrl: [photoUrl],
		},
		uid,
	};

	const createdActivity = await fetch(`${BASE_URL}activity/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formattedActivity),
	});
	const jsonCreatedActivity = await createdActivity.json();

	return jsonCreatedActivity;
};

export const getActivities = async () => {
	const activitiesList = await fetch(`${BASE_URL}activity/all`);
	const jsonActivitiesList = await activitiesList.json();

	return jsonActivitiesList;
};

export const getActivitiesByCoordinates = async (viewportCoords: any) => {
	try {
		const activitiesByCoord = await fetch(`${BASE_URL}activity/coordinates`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(viewportCoords),
		});
		const jsonActivitiesByCoord = await activitiesByCoord.json();
		return jsonActivitiesByCoord;
	} catch (e) {
		console.log(e);
		return e;
	}
};
