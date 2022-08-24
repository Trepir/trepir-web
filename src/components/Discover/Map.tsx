import React from 'react';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectMarkers,
	selectPanCoords,
	selectViewportCoords,
	setMapViewport,
} from '../../app/reducers/mapSlice';
// import mapStyle from '../../utils/googleMaps/mapStyle';
// import mapStyle from '../../utils/googleMaps/mapStyle2';

//	We set these up outside of the googlemaps component becasue the map will accidentally rerender
const mapContainerStyle = {
	width: '51vw',
	height: '93vh',
};

const options = {
	// styles: mapStyle,
	disableDefaultUI: true,
	fullscreenControl: true,
	// minZoom: 2,
	// maxZoom: 20,
	restriction: {
		latLngBounds: {
			east: 179.9999,
			north: 85,
			south: -85,
			west: -179.9999,
		},
		strictBounds: true,
	},
};
const center = { lat: 0, lng: 0 };

function Map() {
	const dispatch = useDispatch();
	const viewport = useSelector(selectViewportCoords);
	const panCoords = useSelector(selectPanCoords);

	//	create a reference to the map itself
	//	ref lets you change states without causing app to rerender
	const mapRef: any = React.useRef();
	//	/////////WHEN MAP IS LOADED DO THIS ///////////////
	const onMapLoad = React.useCallback((map: any) => {
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
	const panTo = React.useCallback(({ lat, lng }: any) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(15);
	}, []);

	React.useEffect(() => {
		if (panCoords && mapRef.current !== undefined) {
			panTo(panCoords);
			dispatch(setMapViewport(null));
		}
	}, [panCoords]);

	// ///////////////////////FOR MARKERS//////////////////////////////
	const markers = useSelector(selectMarkers);
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
