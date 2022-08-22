import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { setMapPan } from '../../../app/reducers/mapSlice';

type Props = {
	activity: any;
};

function TravelEvent(props: Props) {
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
					width: 250,
					height: 140,
					flexShrink: 0,
					textDecoration: 'none',
				}}
				elevation={10}
				onClick={() => handleClick()}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
					}}
				>
					<Typography variant="h6" style={{ alignSelf: 'flex-start' }}>
						{activity.destinationLocation.locationName}
					</Typography>
					<Typography variant="h6">
						{activity.originLocation.locationName}
					</Typography>
				</Box>
			</Card>
		</div>
	);
}

export default TravelEvent;
