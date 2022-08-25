import './TopNavigation.css';
import { onAuthStateChanged } from 'firebase/auth';
import { Person } from '@mui/icons-material';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AppBar, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUid, setUid } from '../app/reducers/authSlice';
import { logOut } from '../utils/firebase/firebaseFunctions';
import { gilroyExtra } from '../App';
import auth from '../utils/firebase/firebaseConfig';

const trepirLogo = require('../assets/logo-white.png');

export const primaryColor = '#1CB985';

const isActiveStyle = {
	textDecoration: 'none',
	backgroundColor: primaryColor,
	color: 'white',
};

const pages = [
	<NavLink
		to="/discover"
		className="navbar-link-item"
		style={({ isActive }: any) => (isActive ? isActiveStyle : {})}
	>
		Discover
	</NavLink>,
	<NavLink
		to="/dashboard"
		className="navbar-link-item"
		style={({ isActive }: any) => (isActive ? isActiveStyle : {})}
	>
		Dashboard
	</NavLink>,
	<NavLink
		to="/playground"
		className="navbar-link-item"
		style={({ isActive }: any) => (isActive ? isActiveStyle : {})}
	>
		Playground
	</NavLink>,

	// <Link to="/private">Private</Link>,
];
// const settings = ['Profile', 'Account', 'Logout'];

function TopNavigation() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const uid = useSelector(selectUid);
	const photoURL = localStorage.getItem('photoURL');
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	// const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
	// 	setAnchorElNav(event.currentTarget);
	// };
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = async () => {
		try {
			await logOut();

			dispatch(setUid(null));
			navigate('/discover');
		} catch (error) {
			console.log(error);
		}
	};

	const [pending, setPending] = useState(true);
	const [currentUser, setCurrentUser] = useState<any>();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				if (user) setCurrentUser(user);
				console.log(user?.photoURL);
				setPending(false);
			},
			(error) => {
				console.log('not logged in', error);
				setPending(false);
			}
		);

		return unsubscribe;
	}, []);

	if (pending) return null;

	return (
		<AppBar
			position="static"
			sx={{
				zIndex: 1000,
			}}
			elevation={10}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters className="navbar-container">
					<div className="navbar-logo">
						<img
							src={trepirLogo}
							alt="trepir-logo"
							style={{ height: '33px', width: '36px', marginBottom: '3px' }}
						/>
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: gilroyExtra,
								fontWeight: '900',
								letterSpacing: '0.1rem',
								color: 'primary',
								fontSize: '2rem',
								textDecoration: 'none',
								textAlign: 'center',
							}}
						>
							TREPIR
						</Typography>
					</div>
					<div>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'none' },
								backgroundColor: primaryColor,
							}}
							className="navbar-links"
						>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								<div className="navbar-link-container">
									{pages.map((page) => (
										<MenuItem
											key={pages.indexOf(page)}
											onClick={handleCloseNavMenu}
										>
											<Typography textAlign="center">{page}</Typography>
										</MenuItem>
									))}
								</div>
							</Menu>
						</Box>
					</div>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: gilroyExtra,
							fontWeight: 900,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						TREPIR
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={pages.indexOf(page)}
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: 'white',
									display: 'block',
									fontFamily: gilroyExtra,
									fontWeight: 'bold',
								}}
							>
								{page}
							</Button>
						))}
					</Box>
					<div className="navbar-login">
						{uid ? (
							<Box sx={{ flexGrow: 0 }}>
								<Typography
									noWrap
									sx={{
										display: {
											xs: 'none',
											md: 'flex',
											alignItems: 'center',
										},
										fontWeight: 'bold',
										textDecoration: 'none',
									}}
								>
									{currentUser?.displayName
										? currentUser.displayName
										: currentUser.email}
								</Typography>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										{photoURL ? (
											<Avatar variant="circular" sx={{ bgcolor: primaryColor }}>
												<img src={photoURL} alt="profile-pic" />
												<Person sx={{ bgcolor: primaryColor }} />
											</Avatar>
										) : (
											<Avatar
												alt={
													currentUser?.displayName
														? currentUser.displayName
														: currentUser.email
												}
												src="/static/images/avatar/2.jpg"
												sx={{ backgroundColor: primaryColor }}
											/>
										)}
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem
										key="1"
										onClick={() => {
											handleLogout();
											handleCloseUserMenu();
										}}
									>
										<Typography textAlign="center" component={Link} to="login">
											Logout
										</Typography>
									</MenuItem>
								</Menu>
							</Box>
						) : (
							<Typography
								textAlign="center"
								component={Link}
								to="login"
								sx={{ fontWeight: 'bold' }}
							>
								Login
							</Typography>
						)}
					</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default TopNavigation;
