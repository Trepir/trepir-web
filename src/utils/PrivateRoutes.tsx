import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
	const auth = { token: false };
	return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
