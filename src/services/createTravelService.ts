import { getLatLng } from 'use-places-autocomplete';

export const BASE_URL = 'https://trepir.herokuapp.com/';

const createTravel = async (
	travelInput: any,
	uid: string,
	tripId: string,
	data: any = null
) => {
	console.log('pre-fetch', travelInput);

	// if (travelInput.departureDate) {
	// 	const { departureDate, travelType } = travelInput;
	// } else {
	let departureDate;
	let travelType;
	if (data) {
		departureDate = data.departureDate;
		travelType = data.travelType;
	} else {
		departureDate = travelInput.departureDate;
		travelType = travelInput.travelType;
	}

	const originPhotoUrl = await travelInput.originLocation.photos[0].getUrl();
	const destinationPhotoUrl =
		await travelInput.destinationLocation.photos[0].getUrl();
	const originCoordinates = await getLatLng(travelInput.originLocation);
	const destinationCoordinates = await getLatLng(
		travelInput.destinationLocation
	);

	const originLocation = {
		formattedAddress: travelInput.originLocation.formatted_address,
		country: travelInput.originLocation.formatted_address,
		googleId: travelInput.originLocation.place_id,
		locationName: travelInput.originLocation.name,
		latitude: originCoordinates.lat,
		longitude: originCoordinates.lng,
		photoUrl: originPhotoUrl,
	};
	const destinationLocation = {
		formattedAddress: travelInput.destinationLocation.formatted_address,
		country: travelInput.destinationLocation.formatted_address,
		googleId: travelInput.destinationLocation.place_id,
		locationName: travelInput.destinationLocation.name,
		latitude: destinationCoordinates.lat,
		longitude: destinationCoordinates.lng,
		photoUrl: destinationPhotoUrl,
	};

	const formattedTravel = {
		departure: departureDate,
		travelType,
		origin: originLocation,
		destination: destinationLocation,
		uid,
		tripId,
	};

	console.log('formattedTravel', formattedTravel);

	const createdTravel = await fetch(`${BASE_URL}trip/addTravelEvent`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formattedTravel),
	});
	const jsonCreatedTravel = await createdTravel.json();
	console.log('hello', jsonCreatedTravel);

	return jsonCreatedTravel;
};

export default createTravel;

// Object {

// }
