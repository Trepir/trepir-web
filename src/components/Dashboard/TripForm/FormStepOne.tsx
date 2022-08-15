import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, TextField } from '@mui/material';
// import React, { MutableRefObject } from 'react';

// type Props = {
// 	submitRef: MutableRefObject<HTMLButtonElement | undefined>;
// };

const TripSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
});

function FormStepOne() {
	// const { submitRef } = props;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(TripSchema),
	});

	const onSubmit = async (data: any) => {
		const isValid = await TripSchema.isValid(data);
		if (isValid) {
			console.log(data);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2}>
					<TextField
						variant="filled"
						label="Name of the trip"
						autoFocus
						{...register('name')}
						error={!!errors.name}
					/>
					<button
						// ref={submitRef}
						type="submit"
						style={{ display: 'none' }}
						aria-label="Submit step"
					/>
				</Box>
			</form>
		</div>
	);
}

export default FormStepOne;
