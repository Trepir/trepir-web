import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
// import { User } from '../../types/UserTypes';
import auth from './firebaseConfig';

export const createEmailUser = async (email: string, password: string) => {
	try {
		const user = await createUserWithEmailAndPassword(auth, email, password);
		console.log(user);
		return user;
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
		const user = await signInWithEmailAndPassword(auth, email, password);
		console.log(user);
		return user;
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
			firstName: googleUser.user.displayName,
			lastName: googleUser.user.displayName,
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
