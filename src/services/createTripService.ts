import { getLatLng } from 'use-places-autocomplete';

export const BASE_URL = 'https://trepir.herokuapp.com/';

export const createTrip = async (tripInput: any, uid: string) => {
	// console.log('pre-fetch', tripInput);
	// const formattedLocation = await parseLocationDetails(tripInput.location[0]);
	// console.log(tripInput);
	const photoUrl = await tripInput.placeDetails.photos[0].getUrl();
	const { lat, lng } = await getLatLng(tripInput.placeDetails);
	/* eslint-disable-next-line */
	const { formatted_address, name, place_id } = tripInput.placeDetails;

	const formattedTrip = {
		startDate: tripInput.startDate,
		endDate: tripInput.endDate,

		uid,

		name: tripInput.name,
		/* eslint-disable-next-line */
		googlePlaceId: place_id,
		latitude: lat,
		longitude: lng,
		photoUrl,
		/* eslint-disable-next-line */
		formattedAddress: formatted_address,
		googleLocationName: name,
	};

	/* eslint-disable-next-line */
	// return formattedTrip;

	const createdTrip = await fetch(`${BASE_URL}trip/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formattedTrip),
	});
	const jsonCreatedTrip = await createdTrip.json();
	console.log('hello', jsonCreatedTrip);

	return jsonCreatedTrip;
};

export const addInitialActivities = async (
	initialActivities: any,
	tripId: string
) => {
	try {
		console.log(initialActivities);
		await fetch(`${BASE_URL}activity/initialFavoriteActivities`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				favoriteId: initialActivities,
				tripId,
			}),
		});
	} catch (e) {
		console.log(e);
	}
};
