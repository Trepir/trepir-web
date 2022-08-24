export const parseMapViewport = async (viewport: any) => {
	const viewportCoords = {
		latitudeLow: viewport.zb.lo,
		latitudeHigh: viewport.zb.hi,
		longitudeLow: viewport.Ra.lo,
		longitudeHigh: viewport.Ra.hi,
	};
	return viewportCoords;
};

export const parseMarkersDashboard = (tripDayMap: any) => {
	console.log(tripDayMap);
	const markers: any[] = [];
	const days: [any][] = Object.values(tripDayMap);
	days.forEach((day) => {
		day.forEach((activity) => {
			if (activity.travelEvent) {
				markers.push({
					lat: activity.travelEvent.destinationLocation.latitude,
					lng: activity.travelEvent.destinationLocation.longitude,
				});
			} else if (activity.accommodation) {
				markers.push({
					lat: activity.accommodation.location.latitude,
					lng: activity.accommodation.location.longitude,
				});
			} else {
				markers.push({
					lat: activity.dayActivity.activity.location.latitude,
					lng: activity.dayActivity.activity.location.longitude,
				});
			}
		});
	});
	console.log(markers);
	return markers;
};

export const parseMarkersDiscover = (activities: any[]) => {
	const markers: any[] = [];
	activities.forEach((activity) => {
		markers.push({
			lat: activity.location.latitude,
			lng: activity.location.longitude,
		});
	});

	return markers;
};

export const parseMarkersPlayground = (activities: any[]) => {
	const markers: any[] = [];
	console.log(activities);
	activities.forEach((activity) => {
		markers.push({
			lat: activity.activity.location.latitude,
			lng: activity.activity.location.longitude,
		});
	});

	return markers;
};
