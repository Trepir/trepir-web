import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SelectedTrip() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '50vw',
				height: '93vh',
				backgroundColor: 'pink',
			}}
		>
			<Typography variant="h3">Your Selected Trip</Typography>
		</Box>
	);
}

export default SelectedTrip;
