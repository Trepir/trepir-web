import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as fallbackPhoto from '../../assets/Picture_icon_BLACK.svg';

import { setOneMarker } from '../../app/reducers/mapSlice';

function Activity({ activity, setSelectedActivity }: any) {
	const dispatch = useDispatch();

	function handleClick() {
		dispatch(setOneMarker(activity.coords));

		setSelectedActivity(activity);
	}

	return (
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
			<img
				src={activity.location ? activity.location.photoUrl[0] : fallbackPhoto}
				alt=""
			/>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
				}}
			>
				<Typography variant="h6" style={{ alignSelf: 'flex-start' }}>
					{activity.name}
				</Typography>
				<Typography variant="subtitle1">{activity.description}</Typography>
			</Box>
		</Card>
	);
}

export default Activity;
