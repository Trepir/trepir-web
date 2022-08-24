import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectTagsApplied,
	setFilteredActivities,
	setTagsApplied,
} from '../../app/reducers/discoverSlice';

function Tag({ label }: any) {
	const [selected, setSelected] = useState(false);
	const tagsApplied: any = useSelector(selectTagsApplied);

	useEffect(() => {
		if (tagsApplied?.includes(label)) setSelected(true);
	}, []);
	//  FOR REUX
	const dispatch = useDispatch();

	function handleClick(tag: any) {
		if (selected) setSelected(false);
		if (!selected) setSelected(true);
		dispatch(setTagsApplied(tag));
		dispatch(setFilteredActivities());
	}
	return (
		<Chip
			size="small"
			style={
				selected ? { width: 70, backgroundColor: '#ECCA72' } : { width: 70 }
			}
			onClick={() => handleClick(label)}
			label={label}
		/>
	);
}

export default Tag;
