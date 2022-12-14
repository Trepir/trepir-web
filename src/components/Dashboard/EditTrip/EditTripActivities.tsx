import { Draggable, Droppable } from 'react-beautiful-dnd';
import Activity from '../../Shared/Cards/ActivityCard';

function EditTripActivitiesContainer({
	savedActivities,
	setSelectedActivity,
}: any) {
	//	the ids are so that this list will always contain unique draggable ids. Activity id was not going to work
	const ids: any = [];
	//	eslint-disable-next-line
	for (let i = 0; i <= savedActivities.ActivitiesList.length; i++) {
		ids.push(String(Math.random()));
	}
	return (
		<Droppable droppableId="favoritedActivities" key="favoritedActivities">
			{/* eslint-disable-next-line */}
			{(provided) => {
				return (
					// THIS DIV IS THE CONTAINER
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							margin: '2.5vh 0 0 5vw',
							width: '41vw',
							height: 10,
							gap: 10,
						}}
					>
						{/* eslint-disable-next-line */}
						{savedActivities.ActivitiesList.map((activity: any, index: any) => {
							return (
								<Draggable
									key={ids[index]}
									draggableId={ids[index]}
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
													...provided.draggableProps.style,
												}}
											>
												<Activity
													activity={activity}
													setSelectedActivity={setSelectedActivity}
													dragging={isDragging}
												/>
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
