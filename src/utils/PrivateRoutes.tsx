import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { selectUid } from '../redux/reducers/authSlice';
import { setUserFavoriteActivities } from '../redux/reducers/userSlice';
import { getUserFavoriteActivities } from '../services/favoriteActivityService';
import { fetchFavoriteActivities } from '../redux/reducers/createActivity/favoriteActivitySlice';
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
