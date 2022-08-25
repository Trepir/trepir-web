export const BASE_URL = 'https://trepir.herokuapp.com/';

function compare(a: any, b: any) {
	if (a.order < b.order) {
		return -1;
	}
	if (a.order > b.order) {
		return 1;
	}
	return 0;
}

export const sortDay = (tripDay: any) => {
	if (tripDay.length === 0) return [];
	return tripDay.sort(compare);
};

export const addActivityToTrip = async (
	tripDayId: string,
	activityId: string,
	order: number
) => {
	try {
		const updatedDay = await fetch(`${BASE_URL}trip/addActivity`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ tripDayId, activityId, order }),
		});
		const jsonUpdatedDay = await updatedDay.json();
		const activities = [...jsonUpdatedDay.tripDayActivities];
		const sortedDay = sortDay(activities);
		return sortedDay;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const reorderTripDay = async (
	tripDayId: string,
	tripDayActivityId: string,
	newOrder: number
) => {
	try {
		const updatedDay = await fetch(`${BASE_URL}trip/reorderDay`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ newOrder, tripDayId, tripDayActivityId }),
		});
		const jsonUpdatedDay = await updatedDay.json();

		const activities = [...jsonUpdatedDay.tripDayActivities];
		const sortedDay = sortDay(activities);

		return sortedDay;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const removeActivityFromTrip = async (tripDayActivityId: string) => {
	try {
		const updatedDay = await fetch(`${BASE_URL}trip/deleteEvent`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: tripDayActivityId }),
		});
		await updatedDay.json();
	} catch (error) {
		console.log(error);
	}
};
