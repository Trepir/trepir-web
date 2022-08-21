export const parseMapViewport = async (viewport: any) => {
	const viewportCoords = {
		latitudeLow: viewport.zb.lo,
		latitudeHigh: viewport.zb.hi,
		longitudeLow: viewport.Ra.lo,
		longitudeHigh: viewport.Ra.hi,
	};
	return viewportCoords;
};

export const parseMarkers = (tripDayMap: any) => {
	const markers: any[] = [];
	const days: [any][] = Object.values(tripDayMap);
	days.forEach((day) => {
		day.forEach((activity) => {
			markers.push({
				lat: activity.location.latitude,
				lng: activity.location.longitude,
			});
		});
	});
	return markers;
};
