import React from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { MapOptions } from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectMarkers,
	selectPanCoords,
	selectViewportCoords,
	setMapViewport,
} from '../../Redux/reducers/mapSlice';
import { Coords, ViewpointCoords } from '../../types/MapTypes';

//	We set these up outside of the googlemaps component becasue the map will accidentally rerender
const mapContainerStyle: { width: string; height: string } = {
	width: '51vw',
	height: '93vh',
};

const options: MapOptions = {
	disableDefaultUI: true,
	fullscreenControl: true,
};

const center: Coords = { lat: 0, lng: 0 };

function Map() {
	const dispatch = useDispatch();
	const viewport: ViewpointCoords | null = useSelector(selectViewportCoords);
	const panCoords: Coords | null = useSelector(selectPanCoords);

	//	create a reference to the map itself
	//	ref lets you change states without causing app to rerender
	// eslint-disable-next-line
	const mapRef: { current: google.maps.Map | undefined } = React.useRef();
	//	/////////WHEN MAP IS LOADED DO THIS ///////////////
	// eslint-disable-next-line
	const onMapLoad = React.useCallback((map: google.maps.Map) => {
		mapRef.current = map;
		if (viewport) mapRef.current.fitBounds(viewport);
	}, []);
	//	/////////////////////////////////////////////////

	//	///////////////////FOR VIEWPORT////////////////////////
	React.useEffect(() => {
		if (viewport && mapRef.current !== undefined) {
			mapRef.current.fitBounds(viewport);
		}
	}, [viewport]);
	//	/////////////////////////////////////////////////////////////////
	// ///////////////FOR PAN/ZOOM ON SELECT ACTIVITY///////////////
	const panTo = React.useCallback(({ lat, lng }: Coords) => {
		if (mapRef.current) {
			mapRef.current.panTo({ lat, lng });
			mapRef.current.setZoom(15);
		}
	}, []);

	React.useEffect(() => {
		if (panCoords && mapRef.current !== undefined) {
			panTo(panCoords);
			dispatch(setMapViewport(null));
		}
	}, [panCoords]);

	// ///////////////////////FOR MARKERS//////////////////////////////
	const markers: Coords[] | null = useSelector(selectMarkers);
	//	/////////////////////////////////////////////////////////////////

	// if (loadError) alert('Error loading maps');

	// if (!isLoaded) return <>Loading Maps</>;

	return (
		<GoogleMap
			mapContainerStyle={mapContainerStyle}
			zoom={2}
			center={center}
			onLoad={onMapLoad}
			options={options}
		>
			{markers?.map((marker) => (
				<MarkerF position={marker} />
			))}
		</GoogleMap>
	);
}

export default Map;
