export const filterActivities = async (viewport: any) => {
	const viewportCoords = {
		latitudeLow: viewport.zb.lo,
		latitudeHigh: viewport.zb.hi,
		longitudeLow: viewport.Ra.lo,
		longitudeHigh: viewport.Ra.hi,
	};
	return viewportCoords;
};
