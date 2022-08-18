import { DateTime } from 'luxon';

export const tripDateFormatter = (startDate: string, duration: number) => {
	const dateList: any = [];
	/* eslint-disable-next-line */
	for (let i = 0; i < duration; i++) {
		const utcDay = DateTime.fromISO(startDate).toUTC();

		const updatedUtcDay = utcDay.plus({ days: i });

		const formattedDay = updatedUtcDay.toFormat('MMMM dd, yyyy');

		dateList.push(formattedDay);
	}
	return dateList;
};
