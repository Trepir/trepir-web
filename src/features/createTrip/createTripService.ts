import { getLatLng } from 'use-places-autocomplete';

export const parseLocationDetails = async (details: any) => {
	let country = '';
	let state = '';
	let city = '';

	details?.address_components.forEach((comp: any) => {
		if (comp.types.includes('country')) {
			country = comp.long_name;
		}
		if (comp.types.includes('administrative_area_level_1')) {
			state = comp.long_name;
		}
		if (comp.types.includes('administrative_area_level_2')) {
			city = comp.long_name;
		}
	});
	// console.log(data, details);
	const { lat, lng } = await getLatLng(details?.location[0]);
	const locData = {
		latitude: lat,
		longitude: lng,
		locationName: details?.name,
		googleId: details?.place_id,
		country,
		state,
		city,
	};
	return locData;
};

// const BASE_URL = 'http://localhost:3333/';

const createTrip = async (tripInput: any) => {
	// console.log('pre-fetch', tripInput);
	const formattedLocation = await parseLocationDetails(tripInput.location[0]);

	const formattedTrip = {
		startDate: tripInput.startDate,
		endDate: tripInput.endDate,
		uid: '123456789',
		name: tripInput.name,
		location: formattedLocation,
		accommodation: [
			// {
			// 	"location": {
			// 		"latitude": 12.13,
			// 		"longitude": 234,
			// 		"country": "Mexico",
			// 		"state": "Mexico",
			// 		"locationName": "Hotel",
			// 		"city": "Merida",
			// 		"googleId": "12sae3w"
			// 	},
			// 	"startDate":"2022-07-10",
			// 	"endDate":"2022-07-12"
			// }
		],
	};
	console.log(formattedTrip);
	const createdTrip = await fetch('http://localhost:3333/trip/create', {
		mode: 'no-cors',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formattedTrip),
	});
	const jsonCreatedTrip = await createdTrip.json();
	console.log('hello', jsonCreatedTrip);
};

export default createTrip;
