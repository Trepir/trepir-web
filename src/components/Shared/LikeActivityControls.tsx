import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PlaylistAdd } from '@mui/icons-material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUid } from '../../redux/reducers/authSlice';
import { selectTripList } from '../../redux/reducers/createTrip/tripListSlice';
import {
	selectFavoriteActivities,
	toggleFavoriteActivity,
} from '../../redux/reducers/createActivity/favoriteActivitySlice';
import {
	saveActivityToTrip,
	updateFavoriteActivity,
} from '../../services/favoriteActivityService';

function LikeActivityControls({ activity }: any) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const uid: string | null = useSelector(selectUid);
	const tripList: any = useSelector(selectTripList);
	const favoriteActivities = useSelector(selectFavoriteActivities);
	const favoriteColor: boolean = favoriteActivities.includes(activity.id);

	const dispatch = useDispatch();
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
			saveActivityToTrip(uid, activity.id, tripId, favoriteActivities);
		}
	};

	return (
		<div style={{ position: 'absolute', top: 2, right: 0 }}>
			{uid ? (
				<div
					className="favorite-buttons"
					// style={{ display: 'flex', alignItems: 'center' }}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<IconButton
						aria-label="favorite"
						sx={{
							position: 'relative',
							color: `${favoriteColor ? 'red' : '#d1d1d1'}`,
						}}
						onClick={handleFavorite}
					>
						<FavoriteIcon />
					</IconButton>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Save to trip">
							<IconButton
								onClick={handleClickMenu}
								sx={{ p: 0, color: '#d1d1d1' }}
							>
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
		</div>
	);
}

export default LikeActivityControls;
