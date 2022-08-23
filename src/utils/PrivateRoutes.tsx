import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { selectUid } from '../app/reducers/authSlice';
import { setUserFavoriteActivities } from '../app/reducers/userSlice';
import { getUserFavoriteActivities } from '../features/createActivity/favoriteActivityService';

function PrivateRoutes() {
	const dispatch = useDispatch();
	const uid = useSelector(selectUid);
	useEffect(() => {
		const getFavorites = async () => {
			if (uid) {
				const userFavorites: any[] = await getUserFavoriteActivities(uid);
				dispatch(setUserFavoriteActivities(userFavorites));
				console.log(userFavorites);
			}
		};
		getFavorites();
	}, [uid]);

	return uid ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
