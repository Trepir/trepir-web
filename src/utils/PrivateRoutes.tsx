import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { selectUid } from '../app/reducers/authSlice';
import { setUserFavoriteActivities } from '../app/reducers/userSlice';
import { getUserFavoriteActivities } from '../features/createActivity/favoriteActivityService';
import { fetchFavoriteActivities } from '../features/createActivity/favoriteActivitySlice';
import auth from './firebase/firebaseConfig';

function PrivateRoutes() {
	const dispatch = useDispatch();
	const uid = useSelector(selectUid);
	const [pending, setPending] = useState(true);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				console.log(user);
				setPending(false);
			},
			(error) => {
				console.log('not logged in', error);
				setPending(false);
			}
		);

		return unsubscribe;
	}, []);

	useEffect(() => {
		const getFavorites = async () => {
			if (uid) {
				const userFavorites: any[] = await getUserFavoriteActivities(uid);
				dispatch(setUserFavoriteActivities(userFavorites));
				console.log(userFavorites);
				userFavorites.forEach((activity: any) => {
					dispatch(fetchFavoriteActivities(activity.activityId));
				});
			}
		};
		getFavorites();
	}, [uid]);
	if (pending) return null;
	return uid ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
