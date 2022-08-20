export const getMapViewport = async (details: any) => {
	const viewportCoords = {
		latitudeLow: details.geometry.viewport.zb.lo,
		latitudeHigh: details.geometry.viewport.zb.hi,
		longitudeLow: details.geometry.viewport.Ra.lo,
		longitudeHigh: details.geometry.viewport.Ra.hi,
	};
	return viewportCoords;
};
