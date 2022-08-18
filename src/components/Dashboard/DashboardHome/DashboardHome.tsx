import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function DashboardHome() {
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
			<Button variant="contained" component={Link} to="createtrip">
				Create New Trip
			</Button>
		</Box>
	);
}

export default DashboardHome;
