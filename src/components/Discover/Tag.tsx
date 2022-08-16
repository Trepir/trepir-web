import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectTagsApplied,
	setFilteredActivites,
	setMarkers,
	setTagsApplied,
} from '../../app/reducers/mapSlice';

function Tag({ label }: any) {
	const [selected, setSelected] = useState(false);
	const tagsApplied = useSelector(selectTagsApplied);
	useEffect(() => {
		if (tagsApplied?.includes(label)) setSelected(true);
	}, []);
	//  FOR REUX
	const dispatch = useDispatch();

	function handleClick(tag: any) {
		if (selected) setSelected(false);
		if (!selected) setSelected(true);
		dispatch(setTagsApplied(tag));
		dispatch(setFilteredActivites());
		dispatch(setMarkers());
	}
	return (
		<Chip
			onClick={() => handleClick(label)}
			label={label}
			variant={selected ? 'filled' : 'outlined'}
			color="primary"
		/>
	);
}

export default Tag;
