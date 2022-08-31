import { Box } from '@mui/material';
import { Tag } from '../../../types/ActivityTypes';
import TagChip from './Tag';

function TagList() {
	const tags: Tag[] = [
		'Relax',
		'Landmark',
		'Entertainment',
		'Drinks',
		'Restaurant',
		'Adventure',
		'Museum',
		'Outdoors',
		'Tour',
		'Beach',
		'Culture',
		'Nightlife',
		'Nature',
		'Festivity',
		'Sport',
	];
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 2,
				width: '675px',
				flexWrap: 'wrap',
			}}
		>
			{tags.map((tag: Tag) => (
				<TagChip label={tag} />
			))}
		</Box>
	);
}

export default TagList;
