type Activity = {
	name: string;
	duration?: number;
	description: string;
	time: Date | null;
	rating: number | null;
	tags: any[];
	coords: any;
};

const mock: Activity[] = [
	{
		name: 'Sagrada Familia',
		duration: 10,
		description: 'go see the cool church',
		time: null,
		rating: 33,
		tags: ['Landmark', 'Relax'],
		coords: {
			lat: 41.4036299,
			lng: 2.1743558,
		},
	},
	{
		name: 'Park Guell',
		duration: 40,
		description: 'go see the cool park',
		time: null,
		rating: 43,
		tags: ['Landmark', 'Tour'],
		coords: {
			lat: 41.4144948,
			lng: 2.1526945,
		},
	},
	{
		name: 'Playa de Bogatel',
		duration: 22,
		description: 'go see the cool beach',
		time: null,
		rating: 14,
		tags: ['Nature', 'Beach', 'Relax'],
		coords: {
			lat: 41.3943735,
			lng: 2.2070109,
		},
	},
	{
		name: 'Club Mojito',
		duration: 30,
		description: 'go salsa dance',
		time: null,
		rating: 23,
		tags: ['Nightlife'],
		coords: {
			lat: 41.3931413,
			lng: 2.156818,
		},
	},
	{
		name: 'Club Mojito',
		duration: 30,
		description: 'go salsa dance',
		time: null,
		rating: 23,
		tags: ['Nightlife'],
		coords: {
			lat: 41.3931413,
			lng: 2.156818,
		},
	},
	{
		name: 'Club Mojito',
		duration: 30,
		description: 'go salsa dance',
		time: null,
		rating: 23,
		tags: ['Nightlife'],
		coords: {
			lat: 41.3931413,
			lng: 2.156818,
		},
	},
	{
		name: 'Club Mojito',
		duration: 30,
		description: 'go salsa dance',
		time: null,
		rating: 23,
		tags: ['Nightlife'],
		coords: {
			lat: 41.3931413,
			lng: 2.156818,
		},
	},
	{
		name: 'Club Mojito',
		duration: 30,
		description: 'go salsa dance',
		time: null,
		rating: 23,
		tags: [],
		coords: {
			lat: 41.3931413,
			lng: 2.156818,
		},
	},
];

export default mock;
