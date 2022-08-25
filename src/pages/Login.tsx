import './Login.css';

import { Box, Divider } from '@mui/material';
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
			dispatch(setDisplayName(user.displayName));
			navigate('../dashboard');

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
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10vw',
					paddingTop: '20vh',
				}}
			>
				<div className="auth-form-container">
					<form
						className="login-form"
						onSubmit={handleSubmitLogin}
						style={{
							display: 'flex',
							gap: '1rem',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Fab
							variant="extended"
							onClick={async () => {
								const googleUser = await loginGoogle();
								if (googleUser.uid) navigate('../dashboard');
							}}
							color="secondary"
							sx={{
								fontWeight: 'bold',
								width: '16vw',
								padding: '1.7rem',
								borderRadius: '4px',
							}}
						>
							Login With Google
						</Fab>
						<TextField
							label="Email"
							name="loginEmail"
							required
							sx={{ backgroundColor: 'white', width: '16vw' }}
						/>
						<TextField
							label="Password"
							name="loginPassword"
							type="password"
							sx={{ backgroundColor: 'white', width: '16vw' }}
							required
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{
								fontWeight: 'bold',
								width: '16vw',
								padding: '0.8rem',
							}}
						>
							Login
						</Button>
					</form>
					<Divider orientation="vertical" />
					<form
						onSubmit={handleSubmitRegister}
						style={{
							display: 'flex',
							gap: '1rem',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<TextField
							label="user name"
							name="registerUserName"
							required
							sx={{ backgroundColor: 'white', width: '16vw' }}
						/>
						<TextField
							label="Email"
							name="registerEmail"
							required
							sx={{ backgroundColor: 'white', width: '16vw' }}
						/>
						<TextField
							label="Password"
							name="registerPassword"
							type="password"
							required
							sx={{ backgroundColor: 'white', width: '16vw' }}
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{ fontWeight: 'bold', width: '16vw', padding: '0.8rem' }}
						>
							Register
						</Button>
					</form>
				</div>
			</Box>
		</div>
	);
}

export default Login;
