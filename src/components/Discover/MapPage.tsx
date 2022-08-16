import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectViewingActivtiy } from '../../app/reducers/mapSlice';
import FilterPage from './FilterPage';
import Map from './Map';
import ActivityDetails from './ActivityDetails';

function MapPage() {
	const viewingActivity = useSelector(selectViewingActivtiy);
	console.log(viewingActivity);
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
				<Routes>
					<Route path="/" element={<FilterPage />} />
					<Route path="/activity" element={<ActivityDetails />} />
				</Routes>
			</Paper>

			<Map />
		</Box>
	);
}

export default MapPage;
