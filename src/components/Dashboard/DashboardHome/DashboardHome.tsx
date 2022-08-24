import { Link } from 'react-router-dom';

// import Button from '@mui/material/Button';
import { Fab } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Trip from './Trip';
import { resetMap } from '../../../app/reducers/mapSlice';
import { selectTripList } from '../../../features/createTrip/tripListSlice';

function DashboardHome() {
	type returnedTrips = {
		userTrips: any[];
	};
	const { userTrips }: returnedTrips = useSelector(selectTripList);
	console.log(userTrips);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(resetMap('dashboard'));
	}, []);
	return (
		<Box
			sx={{
				margin: '20vh 0 0 0',
				// height: '93vh',
				// backgroundColor: 'pink',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 5,
				width: '100vw',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant="h3">Select trip to view</Typography>

				{userTrips.length ? (
					<Box
						sx={{
							display: 'flex',
							height: 180,
							overflowX: 'scroll',
							width: '100vw',
							gap: 3,
							padding: '20px 0 0 0',
							justifyContent: 'center',
						}}
					>
						{userTrips.map((trip) => (
							<Trip trip={trip} />
						))}
					</Box>
				) : null}
			</div>
			<Typography variant="h4">or</Typography>
			<Fab
				variant="extended"
				component={Link}
				to="createtrip"
				size="large"
				style={{
					// borderRadius: '18px',
					color: 'white',
					backgroundColor: 'rgba(28, 185, 133, 1)',
				}}
			>
				Create New Trip
			</Fab>
		</Box>
	);
}

export default DashboardHome;
