import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import SearchGooglePlaces from '../../../components/Discover/DiscoverHome/DiscoverGoogleSearch';

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
				// backgroundColor: 'black',
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
			<Typography
				variant="h4"
				style={{ zIndex: 2, margin: '30vh 0 0 0', fontWeight: 'bold' }}
			>
				Where do you want to go?
			</Typography>
			<SearchGooglePlaces />
		</Box>
	);
}

export default HomePage;
