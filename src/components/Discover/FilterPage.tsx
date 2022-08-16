// import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import {
	selectTagsApplied,
	selectViewingActivtiy,
} from '../../app/reducers/mapSlice';
import ActivitiesList from './ActivitiesList';
import FilteredActivitiesList from './FilteredActivitiesList';
import PanSearchGooglePlaces from './PanSearchGooglePlaces';
import TagList from './TagList';

function FilterPage() {
	const tagsApplied = useSelector(selectTagsApplied);
	const viewingActivity = useSelector(selectViewingActivtiy);
	console.log(viewingActivity);
	return (
		<>
			<PanSearchGooglePlaces />
			<TagList />
			{tagsApplied.length ? (
				<FilteredActivitiesList />
			) : (
				<>
					<ActivitiesList />
					<ActivitiesList />
					<ActivitiesList />
					<ActivitiesList />
				</>
			)}
			;
		</>
	);
}

export default FilterPage;
