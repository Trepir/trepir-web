import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, TextField } from '@mui/material';

const TripSchema = yup.object().shape({
	location: yup.string().required('Location is required'),
});

function FormStepTwo() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(TripSchema),
	});
	const onSubmit = async (data: any) => {
		const isValid = await TripSchema.isValid(data);
		if (isValid) console.log(data);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2}>
					<TextField
						variant="filled"
						label="Location"
						autoFocus
						{...register('location')}
						error={!!errors.name}
					/>
				</Box>
			</form>
		</div>
	);
}

export default FormStepTwo;
