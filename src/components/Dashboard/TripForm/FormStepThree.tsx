import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserFavoriteActivities } from '../../../app/reducers/userSlice';
import { setInitialTripFavorites } from '../../../features/createTrip/createTripSlice';
import Activity from '../../Discover/Activity';

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
		console.log(id);
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
									onClick={() => handleAddToTrip(favoriteActivity.id)}
									disabled={initialActivities.includes(
										favoriteActivity.activity.id
									)}
								>
									Add
								</Button>
								<Activity
									activity={favoriteActivity.activity}
									setSelectedActivity={() => null}
								/>
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
