import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import SearchGooglePlaces from './SearchGooglePlaces';

function HomePage() {
	return (
		<Box
			sx={{
				width: '100vw',
				height: '0vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '4vh',
			}}
		>
			<img
				src="globe.png"
				alt="globe"
				style={{
					position: 'absolute',
					width: '100vw',
					height: '93vh',
					filter: 'blur(8px)',
				}}
			/>
			<Typography variant="h3" style={{ zIndex: 2, margin: '30vh 0 0 0' }}>
				Where do you want to go?
			</Typography>
			<SearchGooglePlaces />
		</Box>
	);
}

export default HomePage;
