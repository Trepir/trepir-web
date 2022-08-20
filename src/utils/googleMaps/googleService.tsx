import { useLoadScript } from '@react-google-maps/api';

const libraries: any = ['places'];

export function loadGoogleApi() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
		//	will load the places library as well
		libraries,
	});

	if (loadError) alert('Error loading maps');

	if (!isLoaded) return false;

	return true;
}
