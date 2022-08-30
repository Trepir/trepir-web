/* eslint-disable */

export const EventType = {
	TravelEvent: 'TravelEvent',
	Accommodation: 'Accommodation',
	Activity: 'Activity',
};

/* eslint-disable-next-line */
export type EventType = typeof EventType[keyof typeof EventType];

export type Tag =
	| 'Relax'
	| 'Landmark'
	| 'Entertainment'
	| 'Drinks'
	| 'Restaurant'
	| 'Adventure'
	| 'Museum'
	| 'Outdoors'
	| 'Tour'
	| 'Beach'
	| 'Culture'
	| 'Nightlife'
	| 'Nature'
	| 'Festivity'
	| 'Sport';

/* eslint-disable-next-line */
export type Tag = typeof Tag[keyof typeof Tag];

/* eslint-disable-next-line */
export class Location {
	constructor() {
		this.formattedAddress = '';
		this.photoUrl = [];
		this.latitude = 0;
		this.longitude = 0;
		this.country = '';
		this.state = '';
		this.locationName = '';
		this.city = '';
		this.googleId = null;
	}

	formattedAddress: string;

	latitude: number;

	longitude: number;

	photoUrl: string[];

	country: string;

	state: string;

	locationName: string;

	city: string;

	googleId: string | null;
}

/* eslint-disable-next-line */
export class ActivityEvent {
	constructor() {
		this.id = '';
		this.uid = '';
		this.name = '';
		this.duration = 0;
		this.description = '';
		this.rating = 0;
		this.tags = [] as Tag[];
		this.location = new Location();
		this.imageUrl = '';
		this.time = '';
	}

	id: string;

	uid: string;

	name: string;

	duration: number;

	description: string;

	rating?: number | null;

	tags: Tag[];

	location: Location;

	imageUrl: string;

	time?: string;
}
