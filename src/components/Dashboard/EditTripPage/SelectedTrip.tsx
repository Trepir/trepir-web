// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Activity from '../../Discover/Activity';

function SelectedTrip({ days, tripName }: any) {
	console.log('days', days);
	const idMap: any = {};
	//	eslint-disable-next-line
	for (const [key, value] of Object.entries(days)) {
		console.log(key, value);
		const idArray = [];
		//	eslint-disable-next-line
		for (let i = 0; i < (value as []).length; i++) {
			idArray.push(String(Math.random()));
		}
		idMap[key] = idArray;
	}
	console.log(idMap);
	return (
		<Paper
			elevation={20}
			sx={{
				borderRadius: 3,
				padding: '1vw 0 0 2vw',
				zIndex: '1',
			}}
		>
			<Typography variant="h3" style={{ margin: '0 0 2.5vw 0' }}>
				{tripName}
			</Typography>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					// border: 'solid',
					height: '80vh',
					overflowY: 'scroll',
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
										flexShrink: 0,

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
											key={idMap[day][index]}
											draggableId={idMap[day][index]}
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
		</Paper>
	);
}

export default SelectedTrip;
