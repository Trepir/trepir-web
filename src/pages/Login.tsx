import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
	createEmailUser,
	loginEmailAndPassword,
	loginGoogle,
} from '../utils/firebase/firebaseFunctions';

function Login() {
	const handleSubmitLogin = async (e: any) => {
		e.preventDefault();
		loginEmailAndPassword(
			e.target.loginEmail.value,
			e.target.loginPassword.value
		);
	};
	const handleSubmitRegister = async (e: any) => {
		e.preventDefault();
		createEmailUser(
			e.target.registerEmail.value,
			e.target.registerPassword.value
		);
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
					<TextField label="Email" name="loginEmail" />
					<TextField label="Password" name="loginPassword" type="password" />

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
					<TextField label="Email" name="registerEmail" />
					<TextField label="Password" name="registerPassword" type="password" />

					<Button type="submit" variant="contained" color="secondary">
						Register
					</Button>
				</form>
				<Fab variant="extended" onClick={loginGoogle}>
					Login With Google
				</Fab>
			</Box>
		</div>
	);
}

export default Login;
