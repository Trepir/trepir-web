import { Box, Card, Divider, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { tripDateFormatter } from '../../utils/dateUtils';
import mock from '../../utils/mockActivities';

type Props = {
	days: any;
	startDate: string;
	duration: number;
};

function DaysView(props: Props) {
	const { days, startDate, duration } = props;
	const dateList = tripDateFormatter(startDate, duration);
	return (
		<div>
			{days.map((day: any) => (
				<div>
					<h3>
						Day {day.dayIndex + 1} - {dateList[day.dayIndex]}
					</h3>
					<Divider />
					<Box>
						{mock.map((activity: any) => (
							<Card
								sx={{
									display: 'flex',
									width: '20vw',
									height: '8vw',
									flexShrink: 0,
								}}
								elevation={10}
								key={activity.description ? activity.description : null}
							>
								<AccountBalanceIcon
									style={{ fontSize: '60px', color: 'grey' }}
								/>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										gap: 3,
									}}
								>
									<Typography variant="h5" style={{ alignSelf: 'flex-start' }}>
										{activity ? activity.name : null}
									</Typography>
									<Typography variant="h6" style={{ alignSelf: 'flex-start' }}>
										{activity ? activity.description : null}
									</Typography>
								</Box>
							</Card>
						))}
					</Box>
				</div>
			))}
		</div>
	);
}

export default DaysView;
