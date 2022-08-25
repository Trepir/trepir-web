import { Box, Divider, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetMap, setMarkers } from '../../app/reducers/mapSlice';
import { selectUserFavoriteActivities } from '../../app/reducers/userSlice';
import Activity from '../../components/Discover/Activity';
import Map from '../../components/Discover/Map';
import { loadGoogleApi } from '../../utils/googleMaps/googleService';
import { parseMarkersPlayground } from '../../utils/mapUtils';

function Playground() {
	// ////LOAD MAP
	const map = loadGoogleApi();
	const dispatch = useDispatch();
	const favoritedActivitiesObject: any = useSelector(
		selectUserFavoriteActivities
	);
	const favoritedActivities: any[] = favoritedActivitiesObject.activityList;
	console.log(favoritedActivities);

	useEffect(() => {
		dispatch(resetMap('playground'));
	}, []);

	useEffect(() => {
		if (!favoritedActivities) return;
		const markers = parseMarkersPlayground(favoritedActivities);
		dispatch(setMarkers(markers));
	}, [favoritedActivities]);
	return (
		<div>
			{map ? (
				<Box
					sx={{
						height: '93vh',
						width: '100vw',
						display: 'flex',
					}}
				>
					<Box sx={{ width: '50vw' }} />

					<Paper
						elevation={9}
						sx={{
							width: '50vw',
							height: '91vh',
							borderRadius: '0 15px 15px 0',
							zIndex: 4,
							position: 'absolute',
							display: 'flex',
							flexDirection: 'column',
							overflowY: 'scroll',
							margin: '0 0 0 0',
							backgroundColor: 'white',
							padding: '2vh 0 0 2vw',
						}}
					>
						<div
							style={{
								width: '49vw',
								height: '7vh',
								backgroundColor: 'white',
								position: 'fixed',
								zIndex: 2,
							}}
						>
							<Typography variant="h4" style={{ fontWeight: 'bold' }}>
								Your Liked Activities
							</Typography>
							<Divider
								style={{
									width: '49vw',
									margin: '1vh 0 0 0',
								}}
							/>
						</div>

						<Box
							sx={{
								margin: '9vh 0 0 0',
								padding: '0 0 0 0.5vw',

								display: 'flex',
								flexWrap: 'wrap',
								width: '49vw',
								gap: 2,
								// backgroundColor: 'pink',
							}}
						>
							{favoritedActivities
								? favoritedActivities.map((activity) => (
										<Activity
											activity={activity.activity}
											setSelectedActivity={() => console.log('placeholder')}
										/>
								  ))
								: null}
						</Box>
					</Paper>
					<Map />
				</Box>
			) : null}
		</div>
	);
}

export default Playground;
