import { getLatLng } from 'use-places-autocomplete';

export const BASE_URL = 'https://trepir.herokuapp.com/';

const createAccommodation = async (
	data: any,
	accommodationInput: any,
	uid: string,
	tripId: string
) => {
	console.log('pre-fetch', accommodationInput);
	const { departureDate, accommodationType } = data;
	const departurePhotoUrl =
		await accommodationInput.departureLocation.photos[0].getUrl();
	const arrivalPhotoUrl =
		await accommodationInput.arrivalLocation.photos[0].getUrl();
	const departureCoordinates = await getLatLng(
		accommodationInput.departureLocation
	);
	const arrivalCoordinates = await getLatLng(
		accommodationInput.arrivalLocation
	);

	const departureLocation = {
		formattedAddress: accommodationInput.departureLocation.formatted_address,
		country: accommodationInput.departureLocation.formatted_address,
		googleId: accommodationInput.departureLocation.place_id,
		locationName: accommodationInput.departureLocation.name,
		latitude: departureCoordinates.lat,
		longitude: departureCoordinates.lng,
		photoUrl: departurePhotoUrl,
	};
	const arrivalLocation = {
		formattedAddress: accommodationInput.arrivalLocation.formatted_address,
		country: accommodationInput.arrivalLocation.formatted_address,
		googleId: accommodationInput.arrivalLocation.place_id,
		locationName: accommodationInput.arrivalLocation.name,
		latitude: arrivalCoordinates.lat,
		longitude: arrivalCoordinates.lng,
		photoUrl: arrivalPhotoUrl,
	};

	const formattedAccommodation = {
		departure: departureDate,
		accommodationType,
		origin: departureLocation,
		destination: arrivalLocation,
		uid,
		tripId,
	};

	console.log('formattedTravel', formattedAccommodation);

	const createdAccommodation = await fetch(`${BASE_URL}trip/addTravelEvent`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formattedAccommodation),
	});
	const jsonCreatedAccommodation = await createdAccommodation.json();
	console.log('hello', jsonCreatedAccommodation);

	return jsonCreatedAccommodation;
};

export default createAccommodation;
