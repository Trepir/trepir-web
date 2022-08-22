import { Box, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';

function Playground() {
	useEffect(() => {
		console.log('playground');
	}, []);
	return (
		<Box
			sx={{
				height: '90vh',
				width: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Paper
				elevation={9}
				sx={{
					height: '80vh',
					width: '90vw',
					display: 'flex',
					flexDirection: 'column',
					// justifyContent: 'center',
					// alignItems: 'center',
				}}
			>
				<Typography variant="h2" style={{ alignSelf: 'flexstart' }}>
					Your Liked Activities
				</Typography>
			</Paper>
		</Box>
	);
}

export default Playground;
