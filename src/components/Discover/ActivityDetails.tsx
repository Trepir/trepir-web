import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Divider, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
	selectPrevViewportCoords,
	setMapViewport,
	// setMarkers,
} from '../../app/reducers/mapSlice';

function ActivityDetails({ setSelectedActivity, activity }: any) {
	const dispatch = useDispatch();
	const prevViewport = useSelector(selectPrevViewportCoords);
	function handleClick() {
		dispatch(setMapViewport(prevViewport));
		setSelectedActivity(false);
	}
	console.log(activity);
	return (
		<>
			<IconButton
				size="small"
				onClick={() => handleClick()}
				style={{
					color: 'rgba(28, 185, 133, 1)',
				}}
			>
				<ArrowBackIosNewIcon />
			</IconButton>
			<Box
				sx={{
					display: 'flex',
					width: '40vw',
					// backgroundColor: 'yellow',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						// backgroundColor: 'pink',
						// justifyContent: 'space-around',
						gap: '6vh',
						width: '22vw',
						margin: '0 1vw 0 0',
						// padding: 2,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
						}}
					>
						<Typography variant="h4" style={{ fontWeight: 'bold' }}>
							{activity.name}
						</Typography>
						<div style={{ display: 'flex', gap: 10 }}>
							{activity.tags.map((tag: any) => (
								<Chip
									label={tag}
									style={{
										width: 70,
										backgroundColor: '#ECCA72',
										color: 'black',
									}}
									size="small"
								/>
							))}
						</div>
					</div>
					<div>
						<Typography
							variant="h5"
							style={{ color: 'rgba(28, 185, 133, 1)', fontWeight: 'bold' }}
						>
							Description:
						</Typography>
						<Typography variant="h6">{activity.description}</Typography>
					</div>
				</Box>

				<img
					src={activity.location ? activity.location.photoUrl[0] : null}
					alt="location pic"
					style={{
						width: '17vw',
						height: '17vw',
						borderRadius: 15,
					}}
				/>
			</Box>
			<Divider style={{ margin: '4vh 0 0 0' }} />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '40vw',
					padding: 2,
				}}
			>
				<div style={{ width: '23vw' }}>
					<Typography
						variant="h6"
						style={{ color: 'rgba(28, 185, 133, 1)', fontWeight: 'bold' }}
					>
						Address:
					</Typography>
					<Typography variant="body1">
						{activity.location.formattedAddress}
					</Typography>
				</div>
				<div style={{ width: '17vw' }}>
					<Typography
						variant="h6"
						style={{ color: 'rgba(28, 185, 133, 1)', fontWeight: 'bold' }}
					>
						Duration:
					</Typography>
					<Typography variant="body1">
						{Math.floor(activity.duration / 60)}:
						{activity.duration % 60 < 9
							? `0${activity.duration % 60}`
							: activity.duration % 60}
						h
					</Typography>
				</div>
			</Box>
		</>
	);
}

export default ActivityDetails;
