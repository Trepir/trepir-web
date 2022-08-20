import React from 'react';

import {
	GoogleMap,
	// useLoadScript,
	MarkerF,
	// InfoWindow,
} from '@react-google-maps/api';
//	REDUX IMPORTS
import { useSelector } from 'react-redux';
import {
	selectMapCenter,
	selectMarkers,
	// selectPanCoords,
	selectViewportCoords,
} from '../../app/reducers/mapSlice';
// import { Coords } from '../../types/MapTypes';

//	We set these up outside of the googlemaps component becasue the map will accidentally rerender
//	otherwise
// const libraries = ['places'];
const mapContainerStyle = {
	width: '51vw',
	height: '100vh',
};

function Map() {
	const center = useSelector(selectMapCenter);

	//	for actually laoding the map from the API
	// const { isLoaded, loadError } = useLoadScript({
	// 	googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
	// 	//	will load the places library as well
	// 	// libraries,
	// });

	//	create a reference to the map itself
	//	ref lets you change states without causing app to rerender
	const mapRef: any = React.useRef();
	const onMapLoad = React.useCallback((map: any) => {
		mapRef.current = map;
	}, []);

	// const panTo = React.useCallback(({ lat, lng }: Coords) => {
	// 	mapRef.current.panTo({ lat, lng });
	// 	mapRef.current.setZoom(14);
	// }, []);

	//	FOR VIEWPORT
	const viewport = useSelector(selectViewportCoords);
	React.useEffect(() => {
		if (viewport) {
			console.log(mapRef.current);
			mapRef.current.fitBounds(viewport);
		}
	}, [viewport]);

	//	FOR PAN
	// const panCoords = useSelector(selectPanCoords);
	// React.useEffect(() => {
	// 	if (panCoords) panTo(panCoords);
	// }, [panCoords]);

	// FOR MARKERS
	const markers = useSelector(selectMarkers);
	console.log(markers);
	// if (loadError) alert('Error loading maps');

	// if (!isLoaded) return <>Loading Maps</>;

	return (
		<GoogleMap
			mapContainerStyle={mapContainerStyle}
			zoom={9}
			center={center}
			onLoad={onMapLoad}
			// options={options}
		>
			{markers?.map((marker) => (
				<MarkerF position={marker} />
			))}
		</GoogleMap>
	);
}

export default Map;
