import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function Activity({ activity }: any) {
	return (
		<Card
			sx={{
				display: 'fex',
				width: '20vw',
				height: '8vw',
				flexShrink: 0,
				textDecoration: 'none',
			}}
			elevation={10}
			component={Link}
			to="activity"
		>
			<AccountBalanceIcon style={{ fontSize: '110px', color: 'grey' }} />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
				}}
			>
				<Typography variant="h6" style={{ alignSelf: 'flex-start' }}>
					{activity.name}
				</Typography>
				<Typography variant="subtitle1">{activity.description}</Typography>
			</Box>
		</Card>
	);
}

export default Activity;
