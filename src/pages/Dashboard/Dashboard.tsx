import { useEffect, useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUid } from '../../app/reducers/authSlice';
import { BASE_URL } from '../../features/createTrip/createTripService';
import LeftDrawer from '../LeftDrawer';

import {
	addAllTrips,
	selectTripList,
} from '../../features/createTrip/tripListSlice';
import TripForm from './TripForm';
import DashboardHome from '../../components/Dashboard/DashboardHome/DashboardHome';
import EditTripPage from '../../components/Dashboard/EditTripPage/EditTripPage';
// import CreateActivityForm from '../../components/Dashboard/EditTripPage/CreateActivity';
// import CalendarView from './CalendarView';
import AddTravelForm from '../../components/Dashboard/TripForm/AddTravelForm';

function Dashboard() {
	// ACTIVITY FORM MODAL LOGIC TO BE REUSED ANYWHERE
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};
	// ////////////////////////////////////
	const dispatch = useDispatch();
	const tripList = useSelector(selectTripList);
	const uid = useSelector(selectUid);
	console.log(tripList);
	useEffect(() => {
		const getTripList = async () => {
			try {
				//	UID FAIL CHECK DO NOT REMOVE
				//		THIS USEEFFECT NOW WATCH THE UID VALUE AND WILL GET CALLED WHEN IT CHANGES
				if (!uid) return;

				const userDetails = await fetch(`${BASE_URL}user/signin`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ uid }),
				});
				const jsonUserDetails = await userDetails.json();
				console.log(jsonUserDetails);
				const { trips } = jsonUserDetails;
				console.log(trips);
				dispatch(addAllTrips(trips));
			} catch (e) {
				console.log(e);
			}
		};
		getTripList();
	}, [uid]);

	return (
		<>
			<LeftDrawer />
			<Routes>
				<Route path="/" element={<DashboardHome />} />
				<Route path="/createtrip" element={<TripForm />} />
				<Route path="/trip" element={<EditTripPage />} />
			</Routes>
			{/* Create Activity Modal render */}
			{/* <Button onClick={handleOpen}>Create Activity</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="create-activity-modal"
				aria-describedby="create-activity-modal"
			>
				<Box sx={style}>
					<CreateActivityForm />
				</Box>
			</Modal> */}
			<Button onClick={handleOpen}>Create Travel Event</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="create-activity-modal"
				aria-describedby="create-activity-modal"
			>
				<Box sx={style}>
					<AddTravelForm />
				</Box>
			</Modal>
		</>
	);
}

export default Dashboard;
