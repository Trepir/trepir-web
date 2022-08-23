// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import {
	Avatar,
	Box,
	Chip,
	// IconButton,
	// Menu,
	// MenuItem,
	// Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
// import { PlaylistAdd } from '@mui/icons-material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import LikeActivityControls from './LikeActivityControls';
// import * as fallbackPhoto from '../../assets/Picture_icon_BLACK.svg';

import { selectPage, setMapPan, setMarkers } from '../../app/reducers/mapSlice';
import // selectFavoriteActivities,
// toggleFavoriteActivity,
'../../features/createActivity/favoriteActivitySlice';
import { selectViewingMap } from '../../app/reducers/dashboardSlice';
import { selectTripId } from '../../features/createTrip/selectedTripSlice';

// import {
// 	saveActivityToTrip,
// 	updateFavoriteActivity,
// } from '../../features/createActivity/favoriteActivityService';
// import { selectUid } from '../../app/reducers/authSlice';
// import { selectTripList } from '../../features/createTrip/tripListSlice';

type Props = {
	activity: any;
	setSelectedActivity: any;
};

function Activity(props: Props) {
	// const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	// const open = Boolean(anchorEl);
	const { activity, setSelectedActivity } = props;
	// const favoriteActivities = useSelector(selectFavoriteActivities);
	// const uid: string | null = useSelector(selectUid);
	// const tripList: any = useSelector(selectTripList);
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

	// const handleFavorite = () => {
	// 	if (uid) {
	// 		dispatch(toggleFavoriteActivity(activity.id));
	// 		updateFavoriteActivity(uid, activity.id);
	// 	}
	// };

	// const handleClickMenu = (event: any) => {
	// 	setAnchorEl(event.currentTarget);
	// };
	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	// const handleAddToTrip = (tripId: string) => {
	// 	if (uid) {
	// 		saveActivityToTrip(uid, activity.id, tripId, favoriteActivities);
	// 	}
	// };

	console.log(activity);

	return (
		<div>
			{/* {uid ? (
				<div className="favorite-buttons">
					<IconButton
						aria-label="favorite"
						sx={{
							position: 'relative',
							color: `${favoriteColor ? 'red' : 'black'}`,
						}}
						onClick={handleFavorite}
					>
						<FavoriteIcon />
					</IconButton>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Save to trip">
							<IconButton onClick={handleClickMenu} sx={{ p: 0 }}>
								<PlaylistAdd />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-select-trip"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(open)}
							onClose={handleClose}
						>
							{tripList.userTrips.length
								? tripList.userTrips.map((trip: any) => (
										<MenuItem
											key={trip.id}
											onClick={() => {
												handleAddToTrip(trip.id);
												handleClose();
											}}
										>
											<Typography>{trip.name}</Typography>
										</MenuItem>
								  ))
								: null}
						</Menu>
					</Box>
				</div>
			) : null} */}
			<Card
				sx={{
					display: 'flex',
					width: 350,
					height: 160,
					padding: '0 0 0 10px',
					flexShrink: 0,
					alignItems: 'center',
					textDecoration: 'none',
					position: 'relative',
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
					sx={{ bgcolor: '#DEF5ED', width: 140, height: 140, color: '#7ED3B7' }}
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
						// backgroundColor: 'pink',

						justifyContent: 'space-between',
						height: 140,
						width: 170,
						padding: '0 0 0 8px',
						// gap: 3,
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
							// backgroundColor: 'blue',
						}}
					>
						<Typography variant="subtitle1" noWrap>
							{activity.location.locationName}
						</Typography>
						<div style={{ display: 'flex', gap: 10 }}>
							{activity.tags.length ? (
								<Chip label={activity.tags[0]} style={{ width: 80 }} />
							) : null}
							{activity.tags.length >= 2 ? (
								<Chip label={activity.tags[1]} style={{ width: 80 }} />
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
