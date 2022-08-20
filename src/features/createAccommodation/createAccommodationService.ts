import { getLatLng } from 'use-places-autocomplete';

export const BASE_URL = 'https://trepir.herokuapp.com/';

const createAccommodation = async (
	data: any,
	accommodationInput: any,
	uid: string,
	tripId: string
) => {
	console.log('pre-fetch', accommodationInput);
	const { checkinDate, checkoutDate } = data;
	const photoUrl = await accommodationInput.location.photos[0].getUrl();
	const coordinates = await getLatLng(accommodationInput.location);

	const location = {
		formattedAddress: accommodationInput.location.formatted_address,
		country: accommodationInput.location.formatted_address,
		googleId: accommodationInput.location.place_id,
		locationName: accommodationInput.location.name,
		latitude: coordinates.lat,
		longitude: coordinates.lng,
		photoUrl,
	};

	const formattedAccommodation = {
		startDate: checkinDate,
		endDate: checkoutDate,
		location,
		uid,
		tripId,
	};

	console.log('formattedTravel', formattedAccommodation);

	const createdAccommodation = await fetch(`${BASE_URL}trip/addAccommodation`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formattedAccommodation),
	});
	const jsonCreatedAccommodation = await createdAccommodation.json();
	console.log('hello', jsonCreatedAccommodation);

	return jsonCreatedAccommodation;
};

export default createAccommodation;
