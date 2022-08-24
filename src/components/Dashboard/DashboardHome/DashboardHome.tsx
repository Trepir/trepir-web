import { Link } from 'react-router-dom';

// import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Divider, Fab, Paper } from '@mui/material';
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
				margin: '15vh 0 0 0',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 5,
				width: '100vw',
			}}
		>
			<img
				src="dashboardBackground.png"
				alt="travel"
				style={{
					position: 'absolute',
					top: '6.5vh',
					zIndex: -1,
					width: '100vw',
					height: '93.5vh',
					filter: 'blur(8px)',
					WebkitFilter: 'blur(8px)',
				}}
			/>
			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: '3vh',
					alignItems: 'center',
					minWidth: '28vw',
					minHeight: '24vh',
					zIndex: 1,
					borderRadius: 5,
					padding: 3,
				}}
				elevation={20}
			>
				{userTrips.length ? (

					<>
						<Typography style={{ fontWeight: 'bold' }} variant="h4">
							Select trip to view
						</Typography>
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
									// position: 'relative',
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
						<Typography variant="h4" style={{ fontWeight: 'bold' }}>
							or
						</Typography>
					</>
				) : (
					<Typography variant="h4" style={{ fontWeight: 'bold' }}>
						Start planning your next trip
					</Typography>
				)}
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
			</Paper>

		</Box>
	);
}

export default DashboardHome;
