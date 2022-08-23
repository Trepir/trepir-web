import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetMap } from '../../../app/reducers/mapSlice';

function DashboardHome() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(resetMap('dashboard'));
	}, []);
	return (
		<Box
			sx={{
				margin: '20vh 0 0 0',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 5,
				width: '100vw',
			}}
		>
			<Typography variant="h3">Select trip to view</Typography>
			<Typography variant="h6">or</Typography>
			<Button
				variant="contained"
				component={Link}
				to="createtrip"
				sx={{
					borderRadius: '18px',
					color: '#fff',
				}}
			>
				Create New Trip
			</Button>
		</Box>
	);
}

export default DashboardHome;
