// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// import { Box, Button, TextField } from '@mui/material';
// import { Send } from '@mui/icons-material';

// const TripSchema = yup.object().shape({
// 	name: yup.string().required('Name is required'),
// });

// remove any
// const {
// 	register,
// 	handleSubmit,
// 	formState: { errors },
// } = useForm<any>({
// 	resolver: yupResolver(TripSchema),
// });

// const onSubmit = async (data: any) => {
// 	const isValid = await TripSchema.isValid(data);
// 	if (isValid) console.log(data);
// };

function FormStep() {
	return (
		<div>
			{/* <form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2}>

					<TextField
						variant="filled"
						label="Name of the trip"
						fullWidth
						autoFocus
						{...register('name')}
						error={!!errors.name}
					/>
					<Button
						type="submit"
						size="small"
						variant="contained"
						endIcon={<Send />}
					>
						Submit
					</Button>
				</Box>
			</form> */}
		</div>
	);
}

export default FormStep;
