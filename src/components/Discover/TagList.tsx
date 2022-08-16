import { Box, Chip } from '@mui/material';

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
	];
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 2,
				width: '50vw',
				flexWrap: 'wrap',
			}}
		>
			{tags.map((tag) => (
				<Chip label={tag} variant="filled" />
			))}
		</Box>
	);
}

export default TagList;
