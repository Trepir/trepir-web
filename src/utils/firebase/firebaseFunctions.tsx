import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
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
interface user2 {
	user: {
		displayName: string | null;
	};
}
export const loginEmailAndPassword = async (
	email: string,
	password: string
) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, password);
		console.log(user);
		const newUser: user2 = user;
		newUser.user.displayName = 'hello';
		console.log('newUser', newUser);
		return user;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const loginGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
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
