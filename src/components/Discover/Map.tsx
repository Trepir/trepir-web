import React from 'react';

import {
	GoogleMap,
	MarkerF,
	// InfoWindow,
} from '@react-google-maps/api';
//	REDUX IMPORTS
import { useSelector } from 'react-redux';
import {
	selectMarkers,
	selectViewportCoords,
} from '../../app/reducers/mapSlice';

//	We set these up outside of the googlemaps component becasue the map will accidentally rerender
const mapContainerStyle = {
	width: '51vw',
	height: '100vh',
};
const center = { lat: 0, lng: 0 };

function Map() {
	const viewport = useSelector(selectViewportCoords);
	//	create a reference to the map itself
	//	ref lets you change states without causing app to rerender
	const mapRef: any = React.useRef();
	const onMapLoad = React.useCallback((map: any) => {
		mapRef.current = map;
		if (viewport) mapRef.current.fitBounds(viewport);
	}, []);

	//	FOR VIEWPORT
	React.useEffect(() => {
		if (viewport && mapRef.current !== undefined) {
			mapRef.current.fitBounds(viewport);
		}
	}, [viewport]);

	// FOR MARKERS
	const markers = useSelector(selectMarkers);
	// if (loadError) alert('Error loading maps');

	// if (!isLoaded) return <>Loading Maps</>;

	return (
		<GoogleMap
			mapContainerStyle={mapContainerStyle}
			zoom={2}
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
