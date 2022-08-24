import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Activity from '../../Discover/Activity';
import TravelEvent from './TravelEvent';
import AccommodationEvent from './AccommodationEvent';

function SelectedTrip({ days, tripName, setSelectedActivity }: any) {
	const idMap: any = {};
	//	eslint-disable-next-line
	for (const [key, value] of Object.entries(days)) {
		const idArray = [];
		//	eslint-disable-next-line
		for (let i = 0; i < (value as []).length; i++) {
			idArray.push(String(Math.random()));
		}
		idMap[key] = idArray;
	}
	return (
		<>
			<div
				style={{
					width: '50vw',
				}}
			>
				spacer
			</div>
			<Paper
				elevation={9}
				sx={{
					borderRadius: '0 15px 15px 0',
					margin: '0.1vh 0 0 0',
					padding: '2vh 0 0 2vw',
					zIndex: 3,
					position: 'absolute',
				}}
			>
				<Typography variant="h3" style={{ margin: '0 0 2.5vw 0' }}>
					{tripName}
				</Typography>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						height: '80.7vh',
						overflowY: 'scroll',
						width: '50vw',
					}}
				>
					{/* //Pulls the key and value out of the object */}
					{Object.entries(days).map(([day, activities]) => (
						<Droppable droppableId={day} key={day} direction="horizontal">
							{(provided) => (
								<>
									<div>
										<Typography variant="h5">{day}</Typography>
										<Divider style={{ width: '48.3vw' }} />
									</div>

									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{
											// background: 'lightblue',
											flexShrink: 0,

											padding: '20px 0 0 6px',
											display: 'flex',
											flexDirection: 'row',
											overflowX: 'auto',
											width: '48vw',
											gap: 120,
											justifyContent: 'flex-start',
											height: 180,
											// minHeight: '8rem',
										}}
										// elevation={10}
									>
										{(activities as any[]).map((activity, index) => (
											<Draggable
												key={idMap[day][index]}
												draggableId={idMap[day][index]}
												index={index}
											>
												{/* eslint-disable-next-line */}
												{(provided, snapShot) => {
													const { isDragging } = snapShot;

													return (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={{
																height: 140,
																width: 250,
																...provided.draggableProps.style,
															}}
														>
															{/* eslint-disable-next-line */}
															{activity.travelEvent ? (
																<TravelEvent activity={activity.travelEvent} />
															) : //	eslint-disable-next-line
															activity.accommodation ? (
																<AccommodationEvent
																	activity={activity.accommodation}
																/>
															) : activity.dayActivity ? (
																<Activity
																	activity={activity.dayActivity.activity}
																	setSelectedActivity={setSelectedActivity}
																	dragging={isDragging}
																/>
															) : (
																<Activity
																	activity={activity}
																	setSelectedActivity={setSelectedActivity}
																/>
															)}
														</div>
													);
												}}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								</>
							)}
						</Droppable>
					))}
				</div>
			</Paper>
		</>
	);
}

export default SelectedTrip;
