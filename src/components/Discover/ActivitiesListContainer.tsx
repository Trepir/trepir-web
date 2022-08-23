import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectViewportCoords, setMarkers } from '../../app/reducers/mapSlice';
import {
	selectActivities,
	setActivities,
} from '../../app/reducers/discoverSlice';
import { getActivitiesByCoordinates } from '../../features/createActivity/createActivityService';
import { parseMapViewport, parseMarkersDiscover } from '../../utils/mapUtils';
import ActivitiesList from './ActivitiesList';

function ActivitiesListContainer({ setSelectedActivity }: any) {
	const tags = [
		'Relax',
		'Landmark',
		'Entertainment',
		'Drinks',
		'Restaurant',
		'Adventure',
		'Museum',
		'Outdoors',
		'Tour',
		'Beach',
		'Culture',
		'Nightlife',
		'Nature',
		'Festivity',
		'Sport',
	];
	const dispatch = useDispatch();
	const viewportCoords: any = useSelector(selectViewportCoords);
	const activities: any = useSelector(selectActivities);

	useEffect(() => {
		const getActivities = async () => {
			if (!viewportCoords) return;
			//	NOTE: WE DO A FETCH EVERY TIME WE RETURN FROM AN ACTIVITY DETAIL--- MAYBE FIX?
			const parsedViewport = await parseMapViewport(viewportCoords);
			const activityListByCoord = await getActivitiesByCoordinates(
				parsedViewport
			);
			dispatch(setActivities(activityListByCoord));
			const markers = parseMarkersDiscover(activityListByCoord);
			dispatch(setMarkers(markers));
		};
		getActivities();
	}, [viewportCoords]);

	return (
		<div>
			{activities ? (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						margin: '25vh 0 0 0',
					}}
				>
					{tags.map((tag) => {
						const filteredList = (activities as any[]).filter((activity) =>
							activity.tags.includes(tag)
						);
						return (
							<div>
								<ActivitiesList
									title={tag}
									activities={filteredList}
									setSelectedActivity={setSelectedActivity}
								/>
							</div>
						);
					})}
				</Box>
			) : null}
		</div>
	);
}

export default ActivitiesListContainer;
