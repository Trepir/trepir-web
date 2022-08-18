import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectTripList } from '../features/createTrip/tripListSlice';
import { setSelectedTripId } from '../features/createTrip/selectedTripSlice';
import { useDispatch } from 'react-redux';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userTrips } = useSelector(selectTripList);
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer =
		(anchor: Anchor, open: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event &&
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};

	const list = (anchor: Anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Typography>Your trips</Typography>
			<Divider />
			<List>
				{userTrips.length
					? userTrips.map((trip: any) => (
							<ListItem key={trip.startDate} disablePadding>
								<ListItemButton>
									<ListItemText
										onClick={() => {
											dispatch(setSelectedTripId(trip.id));
											navigate('trip');
										}}
										primary={trip.name}
									/>
								</ListItemButton>
							</ListItem>
					  ))
					: null}
			</List>
		</Box>
	);

	return (
		<div style={{ position: 'absolute', top: '45vh', left: 0 }}>
			{(['left'] as const).map((anchor) => (
				<React.Fragment key={anchor}>
					<Button onClick={toggleDrawer(anchor, true)}>
						<ArrowForwardIosIcon />
					</Button>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						{list(anchor)}
					</SwipeableDrawer>
				</React.Fragment>
			))}
		</div>
	);
}
