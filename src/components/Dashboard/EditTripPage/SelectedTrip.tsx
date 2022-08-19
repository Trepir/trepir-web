// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Activity from '../../Discover/Activity';

function SelectedTrip({ days }: any) {
	console.log(days);
	return (
		// <Box
		// 	sx={{
		// 		display: 'flex',
		// 		flexDirection: 'column',
		// 		justifyContent: 'center',
		// 		alignItems: 'center',
		// 		width: '50vw',
		// 		height: '93vh',
		// 		backgroundColor: 'pink',
		// 	}}
		// >
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				// border: 'solid',
				width: '50vw',
			}}
		>
			{/* //Pulls the key and value out of the object */}
			{Object.entries(days).map(([day, activities]) => (
				<Droppable droppableId={day} key={day} direction="horizontal">
					{(provided) => (
						<>
							<Typography variant="h5">{day}</Typography>

							<Paper
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{
									// background: 'lightblue',
									padding: 4,
									display: 'flex',
									flexDirection: 'row',
									overflowX: 'auto',
									width: '46vw',
									gap: 20,
									justifyContent: 'flex-start',
									height: 200,
									// minHeight: '8rem',
								}}
								elevation={10}
							>
								{(activities as any[]).map((activity, index) => (
									<Draggable
										key={activity.id}
										draggableId={activity.id}
										index={index}
									>
										{/* eslint-disable-next-line */}
										{(provided) => {
											return (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={{
														// userSelect: 'none',
														// padding: 4,
														height: 140,
														// minHeight: '6rem',
														width: 250,
														// minWidth: '4rem',
														// backgroundColor: '#456C86',
														// color: 'white',
														// border: '1px solid black',
														...provided.draggableProps.style,
													}}
												>
													<Activity
														activity={activity}
														setSelectedActivity={() =>
															console.log('placeholder')
														}
													/>
												</div>
											);
										}}
									</Draggable>
								))}
								{provided.placeholder}
							</Paper>
						</>
					)}
				</Droppable>
			))}
		</div>
		// </Box>
	);
}

export default SelectedTrip;
