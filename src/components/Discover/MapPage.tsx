import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import FilterPage from './FilterPage';
import Map from './Map';

function MapPage() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<Box sx={{ width: '49vw' }} />
			<Paper
				elevation={20}
				sx={{
					width: '50vw',
					height: '92.5vh',
					borderRadius: 3,
					zIndex: 4,
					position: 'absolute',
					display: 'flex',
					flexDirection: 'column',
					overflowY: 'scroll',
				}}
			>
				<FilterPage />
			</Paper>
			<Map />
		</Box>
	);
}

export default MapPage;
