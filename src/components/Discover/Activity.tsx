import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { setOneMarker } from '../../app/reducers/mapSlice';

function Activity({ activity, setSelectedActivity }: any) {
	const dispatch = useDispatch();

	function handleClick() {
		dispatch(setOneMarker(activity.coords));

		setSelectedActivity(activity);
	}

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
			onClick={() => handleClick()}
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
