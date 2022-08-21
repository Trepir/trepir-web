import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import { Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as fallbackPhoto from '../../assets/Picture_icon_BLACK.svg';

import { setOneMarker } from '../../app/reducers/mapSlice';
import {
	selectFavoriteActivities,
	toggleFavoriteActivity,
} from '../../features/createActivity/favoriteActivitySlice';

type Props = {
	activity: any;
	setSelectedActivity: any;
};

function Activity(props: Props) {
	const { activity, setSelectedActivity } = props;
	const favoriteActivities = useSelector(selectFavoriteActivities);
	const dispatch = useDispatch();

	const favoriteColor: boolean = favoriteActivities.includes(activity.id);

	function handleClick() {
		dispatch(
			setOneMarker({
				lat: activity.location.latitude,
				lng: activity.location.longitude,
			})
		);

		setSelectedActivity(activity);
	}

	const handleFavorite = () => {
		dispatch(toggleFavoriteActivity(activity.id));
	};

	return (
		<div>
			<IconButton
				aria-label="favorite"
				sx={{
					position: 'absolute',
					color: `${favoriteColor ? 'red' : 'white'}`,
				}}
				onClick={handleFavorite}
			>
				<FavoriteIcon />
			</IconButton>
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
					src={
						activity.location ? activity.location.photoUrl[0] : fallbackPhoto
					}
					alt="location pic"
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
		</div>
	);
}

export default Activity;
