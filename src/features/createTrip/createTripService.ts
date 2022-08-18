import { getLatLng } from 'use-places-autocomplete';

// const BASE_URL = 'http://localhost:3333/';

const createTrip = async (tripInput: any, uid: string) => {
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
		googleId: place_id,
		latitude: lat,
		longitude: lng,
		photoUrl,
		/* eslint-disable-next-line */
		formattedAddress: formatted_address,
		locationName: name,
		accommodation: [],
	};
	/* eslint-disable-next-line */
	return formattedTrip;

	// const createdTrip = await fetch('http://localhost:3333/trip/create', {
	// 	mode: 'no-cors',
	// 	method: 'POST',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify(formattedTrip),
	// });
	// const jsonCreatedTrip = await createdTrip.json();
	// console.log('hello', jsonCreatedTrip);
};

export default createTrip;
