import { getLatLng } from 'use-places-autocomplete';

export const BASE_URL = 'https://trepir.herokuapp.com/';

const createActivity = async (activityInput: any, uid: string) => {
	console.log('pre-fetch', activityInput);
	const photoUrl = await activityInput.location.photos[0].getUrl();
	console.log(photoUrl.toString());
	const { lat, lng } = await getLatLng(activityInput.location);
	/* eslint-disable-next-line */
	const { formatted_address, name, place_id } = activityInput.location;

	const formattedDuration = Math.floor(
		activityInput.duration.hours / 60 + Number(activityInput.duration.minutes)
	);

	const formattedActivity = {
		name: activityInput.name,
		description: activityInput.description,
		duration: formattedDuration,
		imageUrl: photoUrl,
		location: {
			/* eslint-disable-next-line */
			country: formatted_address,
			/* eslint-disable-next-line */
			googleId: place_id,
			latitude: lat,
			longitude: lng,
			locationName: name,
			photoUrl,
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

export default createActivity;

// Object {

// }
