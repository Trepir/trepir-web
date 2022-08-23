import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getAuth } from 'firebase/auth';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
	createEmailUser,
	loginEmailAndPassword,
	loginGoogle,
} from '../utils/firebase/firebaseFunctions';
import { selectUid, setDisplayName } from '../app/reducers/authSlice';

function Login() {
	const navigate = useNavigate();
	const uid = useSelector(selectUid);
	const dispatch = useDispatch();

	const handleSubmitLogin = async (e: any) => {
		e.preventDefault();
		try {
			const user = await loginEmailAndPassword(
				e.target.loginEmail.value,
				e.target.loginPassword.value
			);
			console.log('userdet', user);
			dispatch(setDisplayName(user.displayName));
			if (uid) navigate('../dashboard');

			// dispatch(setUid(user.uid));
		} catch (error) {
			console.log(error);
		}
	};
	const handleSubmitRegister = async (e: any) => {
		e.preventDefault();
		try {
			await createEmailUser(
				e.target.registerEmail.value,
				e.target.registerPassword.value,
				e.target.registerUserName.value
			);
			if (uid) navigate('../dashboard');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Box
				sx={{
					width: '100vw',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10vw',
				}}
			>
				<form
					onSubmit={handleSubmitLogin}
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<TextField label="Email" name="loginEmail" required />
					<TextField
						label="Password"
						name="loginPassword"
						type="password"
						required
					/>

					<Button type="submit" variant="contained" color="secondary">
						Login
					</Button>
				</form>
				<form
					onSubmit={handleSubmitRegister}
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<TextField label="user name" name="registerUserName" required />
					<TextField label="Email" name="registerEmail" required />
					<TextField
						label="Password"
						name="registerPassword"
						type="password"
						required
					/>

					<Button type="submit" variant="contained" color="secondary">
						Register
					</Button>
				</form>
				<Fab variant="extended" onClick={loginGoogle} disabled>
					Login With Google
				</Fab>
			</Box>
		</div>
	);
}

export default Login;
