import { Box, Button, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserFavoriteActivities } from '../../../app/reducers/userSlice';
import { setInitialTripFavorites } from '../../../features/createTrip/createTripSlice';

type Props = {
	submitRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

function FormStepThree(props: Props) {
	const dispatch = useDispatch();
	const favoriteActivities: any = useSelector(selectUserFavoriteActivities);
	const { submitRef, setValidated, setActiveStep } = props;
	const [initialActivities, setInitialActivities] = useState<any[]>([]);

	const handleClick = () => {
		console.log('hello');
		setValidated(true);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleAddToTrip = (id: any) => {
		dispatch(setInitialTripFavorites(id));
		setInitialActivities((prev: any) => [...prev, id]);
	};

	return (
		<div className="step-container">
			<div className="favorite-activities-container">
				{favoriteActivities.activityList
					? favoriteActivities.activityList.map((favoriteActivity: any) => (
							<div>
								<Button
									onClick={() => handleAddToTrip(favoriteActivity.activity.id)}
									disabled={initialActivities.includes(
										favoriteActivity.activity.id
									)}
								>
									Add
								</Button>
								<Card
									key={favoriteActivity.activity.id}
									sx={{
										display: 'flex',
										width: 250,
										height: 140,
										flexShrink: 0,
										textDecoration: 'none',
									}}
									elevation={10}
								>
									{/* <img
					src={
						activity.location ? activity.location.photoUrl[0] : fallbackPhoto
					}
					alt="location pic"
				/> */}
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
											{favoriteActivity.activity.name}
										</Typography>
										<Typography variant="subtitle1">
											{favoriteActivity.activity.description}
										</Typography>
									</Box>
								</Card>
							</div>
					  ))
					: null}
			</div>
			<button
				ref={submitRef}
				type="button"
				onClick={handleClick}
				style={{ display: 'none' }}
				aria-label="Submit step"
			/>
		</div>
	);
}

export default FormStepThree;
