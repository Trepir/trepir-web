import { User } from './UserTypes';

export type Trip = {
	id: string;
	createdAt: Date;
	userId: string;
	startDate: Date;
	endDate: Date;
	name: string;
	googlePlaceId: string;
	latitude: number;
	longitude: number;
	formattedAddress: string;
	participants?: User[];
	googleLocationName: string;
	photoUrl: string | null;
};
