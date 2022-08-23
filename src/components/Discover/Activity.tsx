import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { Avatar, Box, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import LikeActivityControls from './LikeActivityControls';
// import * as fallbackPhoto from '../../assets/Picture_icon_BLACK.svg';

import { selectPage, setMapPan, setMarkers } from '../../app/reducers/mapSlice';
import // selectFavoriteActivities,
'../../features/createActivity/favoriteActivitySlice';
import { selectViewingMap } from '../../app/reducers/dashboardSlice';
import { selectTripId } from '../../features/createTrip/selectedTripSlice';

type Props = {
	activity: any;
	setSelectedActivity: any;
};

function Activity(props: Props) {
	const { activity, setSelectedActivity } = props;
	const isTripSelected = useSelector(selectTripId);
	const page = useSelector(selectPage);
	const viewingDashboardMap = useSelector(selectViewingMap);
	const dispatch = useDispatch();

	function handleClick() {
		if (page === 'discover') {
			dispatch(
				setMarkers([
					{
						lat: activity.location.latitude,
						lng: activity.location.longitude,
					},
				])
			);
			setSelectedActivity(activity);
		}
		if (page === 'dashboard' && viewingDashboardMap === false) {
			setSelectedActivity(activity);
		}
		if (page === 'dashboard' && !isTripSelected.tripId) {
			console.log('add activity');
		}
		dispatch(
			setMapPan({
				lat: activity.location.latitude,
				lng: activity.location.longitude,
			})
		);
	}

	console.log(activity);

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
					position: 'relative',
					borderRadius: 5,
					// gap: 1,
				}}
				elevation={5}
			>
				{/* <img
					src={
						activity.location ? activity.location.photoUrl[0] : fallbackPhoto
					}
					alt="location pic"
				/> */}
				<Avatar
					sx={{
						bgcolor: '#DEF5ED',
						width: 140,
						height: 140,
						color: '#7ED3B7',
						borderRadius: 4,
					}}
					variant="rounded"
					onClick={() => handleClick()}
				>
					<EventAvailableIcon
						style={{ width: 110, height: 110 }}
						fill="#7ED3B7"
					/>
				</Avatar>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',

						justifyContent: 'space-between',
						height: 140,
						width: 170,
						padding: '0 0 0 8px',
					}}
					onClick={() => handleClick()}
				>
					<Typography variant="h6" style={{ alignSelf: 'flex-start' }}>
						{activity.name}
					</Typography>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Typography variant="subtitle1" noWrap>
							{activity.location.locationName}
						</Typography>
						<div style={{ display: 'flex', gap: 10 }}>
							{activity.tags.length ? (
								<Chip
									label={activity.tags[0]}
									style={{ width: 70 }}
									size="small"
								/>
							) : null}
							{activity.tags.length >= 2 ? (
								<Chip
									label={activity.tags[1]}
									style={{ width: 70 }}
									size="small"
								/>
							) : null}
						</div>
					</div>
				</Box>
				<LikeActivityControls activity={activity} />
			</Card>
		</div>
	);
}

export default Activity;
