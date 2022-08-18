import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import auth from './firebaseConfig';

const baseURL = 'https://trepir.herokuapp.com';

export const createEmailUser = async (
	email: string,
	password: string,
	displayName: string
) => {
	try {
		//	firebase create user
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(user);

		//	send formatted user to backend
		const result = await fetch(`${baseURL}/user/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName: displayName,
				lastName: displayName,
				displayName,
				email: user.email,
				uid: user.uid,
				photoUrl: 'no pic',
				emailVerified: user.emailVerified,
			}),
		});
		const jsonResult = await result.json();
		console.log(jsonResult);
		return jsonResult;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const loginEmailAndPassword = async (
	email: string,
	password: string
) => {
	try {
		//	authenitcate user from firebase
		const { user } = await signInWithEmailAndPassword(auth, email, password);
		//	send uid to backend
		const result = await fetch(`${baseURL}/user/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				uid: user.uid,
			}),
		});

		const jsonResult = await result.json();

		console.log(jsonResult);
		return jsonResult;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const loginGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const googleUser = await signInWithPopup(auth, provider);
		console.log('googleuser:', googleUser);
		//	google does not split the first and last name for us
		const user: any = {
			firstName: '',
			lastName: '',
			displayName: googleUser.user.displayName,
			email: googleUser.user.email,
			uid: googleUser.user.uid,
			photoUrl: googleUser.user.photoURL,
			emailVerified: googleUser.user.emailVerified,
		};
		console.log(user);
		return user;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const logOut = async () => {
	await signOut(auth);
};
