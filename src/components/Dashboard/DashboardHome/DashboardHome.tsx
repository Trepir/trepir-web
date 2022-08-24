import { Link } from 'react-router-dom';

// import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Divider, Fab } from '@mui/material';
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
				<Typography style={{ fontWeight: 'bold' }} variant="h4">
					Select trip to view
				</Typography>

				{userTrips.length ? (
					// <div style={{ display: 'flex', width: 400, position: 'relative' }}>
					// 	<img
					// 		src="cameraFilm.png"
					// 		alt="film"
					// 		style={{ position: 'absolute', left: -275, top: -30 }}
					// 	/>
					<div style={{ display: 'flex' }}>
						<Divider
							orientation="vertical"
							style={{
								height: 300,
							}}
						/>
						<Box
							sx={{
								display: 'flex',
								height: 300,
								overflowX: 'scroll',
								// width: 360,
								maxWidth: '62vw',
								padding: '0 1vw 0 1vw',
								gap: 3,
								zIndex: 1,
								// justifyContent: 'center',
								alignItems: 'center',
								// backgroundColor: 'pink',
								position: 'relative',
							}}
						>
							{userTrips.map((trip) => (
								<Trip trip={trip} />
							))}
						</Box>
						<Divider
							orientation="vertical"
							style={{
								height: 300,
							}}
						/>
					</div>
				) : // 	<img
				// 		src="cameraFilm.png"
				// 		alt="film"
				// 		style={{
				// 			position: 'absolute',
				// 			transform: 'scaleX(-1)',
				// 			// transform: 'scale(1.5)',
				// 			right: -275,
				// 			top: -30,
				// 			// backgroundColor: 'pink',
				// 		}}
				// 	/>
				// </div>
				null}
			</div>
			<Typography variant="h4" style={{ fontWeight: 'bold' }}>
				or
			</Typography>
			<Fab
				variant="extended"
				component={Link}
				to="createtrip"
				size="large"
				style={{
					// borderRadius: '18px',
					display: 'flex',
					gap: 10,
					color: 'white',
					backgroundColor: 'rgba(28, 185, 133, 1)',
					fontWeight: 'bold',
				}}
			>
				<AddCircleOutlineIcon />
				Create New Trip
			</Fab>
		</Box>
	);
}

export default DashboardHome;
