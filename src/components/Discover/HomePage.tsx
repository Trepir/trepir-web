import { Box } from '@mui/material';
import SearchGooglePlaces from './SearchGooglePlaces';

function HomePage() {
	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '10vw',
			}}
		>
			<div>Where do you want to go?</div>
			<SearchGooglePlaces />
		</Box>
	);
}

export default HomePage;