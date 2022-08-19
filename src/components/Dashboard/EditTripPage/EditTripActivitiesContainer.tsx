// import { Card, Typography } from '@mui/material';
// import Box from '@mui/material/Box';
import { Draggable, Droppable } from 'react-beautiful-dnd';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={{
							backgroundColor: 'pink',
							width: '50vw',
							display: 'flex',
							flexWrap: 'wrap',
							gap: 10,
						}}
					>
						{/* eslint-disable-next-line */}
						{savedActivities.ActivitiesList.map((activity: any, index: any) => {
							return (
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
													userSelect: 'none',
													padding: 4,
													height: '6rem',
													minHeight: '6rem',
													width: '4rem',
													minWidth: '4rem',
													backgroundColor: '#456C86',
													color: 'white',
													border: '1px solid black',
													...provided.draggableProps.style,
												}}
											>
												{activity.name}
											</div>
										);
									}}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				);
			}}
		</Droppable>
	);
}

export default EditTripActivitiesContainer;
