import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import FilterPage from './FilterPage';
import Map from './Map';

function MapPage() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
				<FilterPage />
			</Paper>
			<Map />
		</Box>
	);
}

export default MapPage;
