import { getLatLng } from 'use-places-autocomplete';
import { Coords } from '../../types/MapTypes';

export const BASE_URL = 'https://trepir.herokuapp.com/';

export const createActivity = async (
	data: any,
	activityInput: any,
	uid: string
) => {
	console.log('pre-fetch', activityInput);
	const { activityName, activityDescription, durationHours, durationMinutes } =
		data;
	const photoUrl = await activityInput.location.photos[0].getUrl();
	console.log(photoUrl.toString());
	const { lat, lng } = await getLatLng(activityInput.location);
	/* eslint-disable-next-line */
	const { formatted_address, name, place_id } = activityInput.location;

	const formattedDuration = Math.floor(durationHours * 60 + durationMinutes);

	console.log(activityInput.location);

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

	console.log(formattedActivity);

	const createdActivity = await fetch(`${BASE_URL}activity/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formattedActivity),
	});
	const jsonCreatedActivity = await createdActivity.json();
	console.log('hello', jsonCreatedActivity);

	return jsonCreatedActivity;
};

export const getActivities = async () => {
	const activitiesList = await fetch(`${BASE_URL}activity/all`);
	const jsonActivitiesList = await activitiesList.json();

	return jsonActivitiesList;
};

export const getActivitiesByCoordinates = async (mapCenter: Coords) => {
	console.log('service');

	const coordinates = {
		latitudeLow: mapCenter.lat - 1,
		latitudeHigh: mapCenter.lat + 1,
		longitudeLow: mapCenter.lng - 1,
		longitudeHigh: mapCenter.lng + 1,
	};
	const activitiesByCoord = await fetch(`${BASE_URL}activity/coordinates`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(coordinates),
	});
	const jsonActivitiesByCoord = await activitiesByCoord.json();

	return jsonActivitiesByCoord;
};
