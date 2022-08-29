import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserFavoriteActivities } from '../../../redux/reducers/userSlice';
import { getActivitiesByCoordinates } from '../../../services/createActivityService';
import {
	selectNewTrip,
	setInitialTripFavorites,
} from '../../../redux/reducers/createTrip/createTripSlice';
import { parseMapViewport } from '../../../utils/mapUtils';
import Activity from '../../Shared/Cards/ActivityCard';

type Props = {
	submitRef: any;
	setValidated: React.Dispatch<React.SetStateAction<boolean>>;
	setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

function FormStepThree(props: Props) {
	const dispatch = useDispatch();
	const favoriteActivities: any = useSelector(selectUserFavoriteActivities);
	const { placeDetails } = useSelector(selectNewTrip);

	const { submitRef, setValidated, setActiveStep } = props;
	const [activitiesbyCoordinates, setActivitiesbyCoordinates] = useState<any>(
		[]
	);
	const [initialActivities, setInitialActivities] = useState<any[]>([]);

	useEffect(() => {
		const getLocationActivities = async () => {
			const parsedViewport = await parseMapViewport(
				placeDetails.geometry.viewport
			);
			const activityListByCoord = await getActivitiesByCoordinates(
				parsedViewport
			);
			console.log('locActivities', activityListByCoord);
			console.log('favActivities', favoriteActivities.activityList);
			const filteredActivities = favoriteActivities.activityList.filter(
				(favActivity: any) =>
					activityListByCoord.some(
						(locActivity: any) => favActivity.activityId === locActivity.id
					)
			);
			console.log(filteredActivities);
			setActivitiesbyCoordinates(filteredActivities);
		};
		getLocationActivities();
	}, []);

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
				{activitiesbyCoordinates.length
					? activitiesbyCoordinates.map((favoriteActivity: any) => (
							<div>
								<Button
									variant="contained"
									sx={{ mb: '0.2rem', borderRadius: '18px' }}
									onClick={() => handleAddToTrip(favoriteActivity.id)}
									disabled={initialActivities.includes(favoriteActivity.id)}
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
