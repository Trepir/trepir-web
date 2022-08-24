import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import { Avatar, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { setMapPan } from '../../../app/reducers/mapSlice';
import { ReactComponent as Hotel } from '../../../assets/Hotel.svg';

type Props = {
	activity: any;
};

function AccommodationEvent(props: Props) {
	const { activity } = props;
	const dispatch = useDispatch();
	function handleClick() {
		dispatch(
			setMapPan({
				lat: activity.location.latitude,
				lng: activity.location.longitude,
			})
		);
	}
	return (
		<div>
			<Card
				sx={{
					display: 'flex',
					width: 340,
					height: 160,
					padding: '0 0 0 10px',
					flexShrink: 0,
					alignItems: 'center',
					textDecoration: 'none',
					gap: 1,
					borderRadius: 5,
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
					variant="rounded"
				>
					<Hotel fill="#7ED3B7" />
				</Avatar>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
						// backgroundColor: 'blue',
						justifyContent: 'space-between',
						height: 140,
						width: 190,
					}}
				>
					<Typography variant="h6" style={{ fontWeight: 'bold' }}>
						{activity.location.locationName
							? activity.location.locationName
							: activity.location.name}
					</Typography>
					{activity.state ? (
						<Typography variant="h6" style={{ alignSelf: 'flex-start' }}>
							{activity.state}
						</Typography>
					) : null}
					{activity.location.locationName ? null : (
						<div>
							<Typography
								variant="h6"
								style={{
									alignSelf: 'flex-start',
									lineHeight: '0.1rem',
									paddingBottom: '0.2rem',
								}}
							>
								Checkin:
								<p>
									<strong>{activity.checkinDate}</strong>
								</p>
							</Typography>
							<Typography
								variant="h6"
								style={{ alignSelf: 'flex-start', lineHeight: '0.1rem' }}
							>
								Checkout:
								<p>
									<strong>{activity.checkoutDate}</strong>
								</p>
							</Typography>
						</div>
					)}
				</Box>
			</Card>
		</div>
	);
}

export default AccommodationEvent;
