import { Box } from '@mui/material';
import Map from './Map';
import PanSearchGooglePlaces from './PanSearchGooglePlaces';

function MapPage() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<PanSearchGooglePlaces />
			<Map />
		</Box>
	);
}

export default MapPage;
