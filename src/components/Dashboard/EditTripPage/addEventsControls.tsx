import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function AddEventsControls() {
	return (
		<Box sx={{ display: 'flex', gap: 10, margin: '3vw 0 0 0' }}>
			<Button variant="contained">Add Activity</Button>
			<Button variant="contained">Add Travel</Button>
			<Button variant="contained">Add Accomodation</Button>
		</Box>
	);
}

export default AddEventsControls;
