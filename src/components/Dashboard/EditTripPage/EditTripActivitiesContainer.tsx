import { Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// import Activity from '../../Discover/Activity';

function EditTripActivitiesContainer({ savedActivities }: any) {
	return (
		<Droppable
			droppableId="favoritedActivities"
			key="favoritedActivities"
			// direction="horizontal"
		>
			{/* eslint-disable-next-line */}
			{(provided) => {
				return (
					<Box
						{...provided.droppableProps}
						ref={provided.innerRef}
						sx={{
							display: 'flex',
							width: '50vw',
							height: 0,
							backgroundColor: 'blue',
							flexWrap: 'wrap',
							gap: 3,
						}}
					>
						{savedActivities.ActivitiesList.map(
							(activity: any, index: number) => (
								<Draggable
									key={activity.id}
									draggableId={activity.id}
									index={index}
								>
									{/* eslint-disable-next-line */}
									{(provided) => {
										return (
											<Card
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={{
													display: 'flex',
													width: '20vw',
													height: '11vw',
													...provided.draggableProps.style,
												}}
											>
												<AccountBalanceIcon
													style={{ fontSize: '110px', color: 'grey' }}
												/>
												<Box
													sx={{
														display: 'flex',
														flexDirection: 'column',
														gap: 3,
													}}
												>
													<Typography
														variant="h6"
														style={{ alignSelf: 'flex-start' }}
													>
														{activity.name}
													</Typography>
												</Box>
											</Card>
										);
									}}
								</Draggable>
							)
						)}
						{provided.placeholder}
					</Box>
				);
			}}
		</Droppable>
	);
}

export default EditTripActivitiesContainer;
