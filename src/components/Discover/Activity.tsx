import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { PlaylistAdd } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import * as fallbackPhoto from '../../assets/Picture_icon_BLACK.svg';

import { selectPage, setMapPan, setMarkers } from '../../app/reducers/mapSlice';
import {
	selectFavoriteActivities,
	toggleFavoriteActivity,
} from '../../features/createActivity/favoriteActivitySlice';
import { selectViewingMap } from '../../app/reducers/dashboardSlice';
import {
	saveActivityToTrip,
	updateFavoriteActivity,
} from '../../features/createActivity/favoriteActivityService';
import { selectUid } from '../../app/reducers/authSlice';
import { selectTripList } from '../../features/createTrip/tripListSlice';

type Props = {
	activity: any;
	setSelectedActivity: any;
};

function Activity(props: Props) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { activity, setSelectedActivity } = props;
	const favoriteActivities = useSelector(selectFavoriteActivities);
	const uid: string | null = useSelector(selectUid);
	const tripList: any = useSelector(selectTripList);
	const page = useSelector(selectPage);
	const viewingDashboardMap = useSelector(selectViewingMap);
	const dispatch = useDispatch();

	const favoriteColor: boolean = favoriteActivities.includes(activity.id);

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
		dispatch(
			setMapPan({
				lat: activity.location.latitude,
				lng: activity.location.longitude,
			})
		);
	}

	const handleFavorite = () => {
		if (uid) {
			dispatch(toggleFavoriteActivity(activity.id));
			updateFavoriteActivity(uid, activity.id);
		}
	};

	const handleClickMenu = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddToTrip = (tripId: string) => {
		if (uid) {
			dispatch(toggleFavoriteActivity(activity.id));
			saveActivityToTrip(uid, activity.id, tripId);
		}
	};

	return (
		<div>
			{uid ? (
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
			) : null}
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
				{/* <img
					src={
						activity.location ? activity.location.photoUrl[0] : fallbackPhoto
					}
					alt="location pic"
				/> */}
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
