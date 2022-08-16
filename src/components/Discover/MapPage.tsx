import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import ActivitiesList from './ActivitiesList';
import Map from './Map';
import PanSearchGooglePlaces from './PanSearchGooglePlaces';
import TagList from './TagList';

function MapPage() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<Box sx={{ width: '49vw' }} />
			<Paper
				elevation={20}
				sx={{
					width: '50vw',
					height: '100vh',
					borderRadius: 3,
					zIndex: 4,
					position: 'absolute',
					display: 'flex',
					flexDirection: 'column',
					overflow: 'scroll',
				}}
			>
				<PanSearchGooglePlaces />
				<TagList />
				<ActivitiesList />
				<ActivitiesList />
				<ActivitiesList />
				<ActivitiesList />
				<ActivitiesList />
			</Paper>

			<Map />
		</Box>
	);
}

export default MapPage;
