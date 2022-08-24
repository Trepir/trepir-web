// import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { Avatar, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedTripId } from '../../../features/createTrip/selectedTripSlice';

type Props = {
	trip: any;
};

function Trip(props: Props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { trip } = props;

	const formattedStartDate = DateTime.fromISO(trip.startDate)
		.toUTC()
		.toFormat('MMM dd, yyyy');

	const formattedEndDate = DateTime.fromISO(trip.endDate)
		.toUTC()
		.toFormat('MMM dd, yyyy');

	console.log(trip);

	function handleClick() {
		console.log('clicked');
		dispatch(setSelectedTripId(trip.id));
		localStorage.setItem('tripId', '');
		localStorage.setItem('tripId', trip.id);
		navigate('trip');
	}
	return (
		<Card
			sx={{
				display: 'flex',
				width: 370,
				height: 160,
				padding: '0 0 0 10px',
				flexShrink: 0,
				alignItems: 'center',
				textDecoration: 'none',
				borderRadius: 5,

				gap: 1,
			}}
			elevation={5}
			onClick={() => handleClick()}
		>
			<Avatar
				sx={{
					bgcolor: '#DEF5ED',
					width: 140,
					height: 140,
					color: '#7ED3B7',
					borderRadius: 3,
				}}
				src={trip.photoUrl.length ? trip.photoUrl : ''}
			>
				<ModeOfTravelIcon style={{ width: 110, height: 110 }} fill="#7ED3B7" />
			</Avatar>
			<Box
				sx={{
					width: 190,
					display: 'flex',
					flexDirection: 'column',
					// alignItems: 'center',
					alignSelf: 'center',
				}}
			>
				<Typography
					variant="h5"
					noWrap
					style={{
						alignSelf: 'flex-start',
						width: 230,
					}}
				>
					{trip.name}
				</Typography>
				<Typography
					variant="body2"
					noWrap
					style={{
						alignSelf: 'flex-start',
						width: 230,
					}}
				>
					Location: {trip.googleLocationName}
				</Typography>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						maxWidth: 'fit-content',
					}}
				>
					<Typography
						variant="body1"
						noWrap
						style={
							{
								// alignSelf: 'flex-start',
								// width: 230,
							}
						}
					>
						{formattedStartDate}
					</Typography>
					<KeyboardArrowDownIcon
						fontSize="medium"
						style={{
							color: '#7ED3B7',
							alignSelf: 'center',
						}}
					/>
					<Typography variant="body1" noWrap>
						{formattedEndDate}
					</Typography>
				</div>
			</Box>
		</Card>
	);
}

export default Trip;
