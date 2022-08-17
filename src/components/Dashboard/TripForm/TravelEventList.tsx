import { Box, Card, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

type Props = {
	event: any;
};

function TravelEventList(props: Props) {
	const { event } = props;
	let classTag = '';
	if (event.location) {
		classTag = 'accommodation-event';
	} else classTag = 'travel-event';

	return (
		<div>
			<Card
				sx={{ display: 'flex', width: '20vw', height: '8vw', flexShrink: 0 }}
				elevation={10}
				key={
					event.location
						? event.location[0].place_id
						: event.departureLocation[0].place_id
				}
			>
				<AccountBalanceIcon style={{ fontSize: '110px', color: 'grey' }} />
				<Box
					className={classTag}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
					}}
				>
					<Typography variant="h6" style={{ alignSelf: 'flex-start' }}>
						{event.location
							? event.location[0].formatted_address
							: event.departureLocation[0].formatted_address}
					</Typography>
					<Typography variant="subtitle1">
						{event.startDate ? event.startDate : event.departureDate} -
						{event.endDate ? event.endDate : null}
					</Typography>
				</Box>
			</Card>
		</div>
	);
}

export default TravelEventList;
