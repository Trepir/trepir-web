import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import { Avatar, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { setMapPan } from '../../../app/reducers/mapSlice';
import { ReactComponent as Airplane } from '../../../assets/airplane.svg';

type Props = {
	activity: any;
};

function TravelEvent(props: Props) {
	const { activity } = props;
	const dispatch = useDispatch();

	console.log(activity);

	function handleClick() {
		dispatch(
			setMapPan({
				lat: activity.destinationLocation.latitude,
				lng: activity.destinationLocation.longitude,
			})
		);
	}
	return (
		<div>
			<Card
				sx={{
					display: 'flex',
					width: 350,
					height: 160,
					padding: '0 0 0 10px',
					flexShrink: 0,
					alignItems: 'center',
					textDecoration: 'none',
					gap: 1,
				}}
				elevation={5}
				onClick={() => handleClick()}
			>
				<Avatar
					sx={{ bgcolor: '#DEF5ED', width: 140, height: 140, color: '#7ED3B7' }}
					variant="rounded"
				>
					<Airplane fill="#7ED3B7" />
				</Avatar>
				<Box
					sx={{
						// backgroundColor: 'blue',
						// height: 140,
						width: 190,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						alignSelf: 'center',
						// gap: 3,
					}}
				>
					<Typography
						variant="h6"
						noWrap
						style={{
							alignSelf: 'flex-start',
							width: 190,
							// backgroundColor: 'blue',
						}}
					>
						{activity.originLocation.locationName}
					</Typography>
					<KeyboardArrowDownIcon
						fontSize="large"
						style={{
							color: '#7ED3B7',
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						style={{
							alignSelf: 'flex-start',
							width: 190,
							// height: 100,
							// backgroundColor: 'blue',
						}}
					>
						{activity.destinationLocation.locationName}
					</Typography>
				</Box>
			</Card>
		</div>
	);
}

export default TravelEvent;
