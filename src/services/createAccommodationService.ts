import { getLatLng } from 'use-places-autocomplete';

export const BASE_URL = 'https://trepir.herokuapp.com/';

const createAccommodation = async (
	accommodationInput: any,
	uid: string,
	tripId: string,
	data: any = null
) => {
	let checkinDate;
	let checkoutDate;
	if (data) {
		checkinDate = data.checkinDate;
		checkoutDate = data.checkoutDate;
	} else {
		checkinDate = accommodationInput.checkinDate;
		checkoutDate = accommodationInput.checkoutDate;
	}
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

	const createdAccommodation = await fetch(`${BASE_URL}trip/addAccommodation`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formattedAccommodation),
	});
	const jsonCreatedAccommodation = await createdAccommodation.json();

	return jsonCreatedAccommodation;
};

export default createAccommodation;
