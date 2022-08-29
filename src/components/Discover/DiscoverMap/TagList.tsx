import { Box } from '@mui/material';
import Tag from './Tag';

function TagList() {
	const tags = [
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
		'Kebab',
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
			{tags.map((tag) => (
				<Tag label={tag} />
			))}
		</Box>
	);
}

export default TagList;
