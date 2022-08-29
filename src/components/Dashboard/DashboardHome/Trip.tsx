// import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedTripId } from '../../../redux/reducers/createTrip/selectedTripSlice';

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

	function handleClick() {
		dispatch(setSelectedTripId(trip.id));
		localStorage.setItem('tripId', '');
		localStorage.setItem('tripId', trip.id);
		navigate('trip');
	}
	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: 360,
				height: 250,
				flexShrink: 0,
				alignItems: 'center',
				padding: 1,
				borderRadius: 5,

				// gap: 1,
			}}
			elevation={5}
			onClick={() => handleClick()}
		>
			<Avatar
				sx={{
					bgcolor: '#DEF5ED',
					width: 360,
					height: 180,
					color: '#7ED3B7',
					borderRadius: 3.5,
				}}
				src={trip.photoUrl.length ? trip.photoUrl : ''}
			>
				<ModeOfTravelIcon style={{ width: 110, height: 110 }} fill="#7ED3B7" />
			</Avatar>
			<div
				style={{
					display: 'flex',
					width: 355,
					justifyContent: 'space-between',
					padding: '0 3px 0 3px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignSelf: 'flex-start',
					}}
				>
					<Typography
						variant="h6"
						noWrap
						style={{
							alignSelf: 'flex-start',
							width: 300,
							fontWeight: 'bold',
						}}
					>
						{trip.name}
					</Typography>
					<Typography
						variant="body2"
						noWrap
						style={{
							alignSelf: 'flex-start',
							width: 300,
						}}
					>
						Location: {trip.googleLocationName}
					</Typography>

					<Typography variant="body2">
						{formattedStartDate} - {formattedEndDate}
					</Typography>
				</Box>
				<ArrowForwardIosIcon style={{ alignSelf: 'center' }} />
			</div>
		</Card>
	);
}

export default Trip;
