import './TopNavigation.css';
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
import React from 'react';
import { AppBar, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectDisplayName,
	selectUid,
	setUid,
} from '../app/reducers/authSlice';
import { logOut } from '../utils/firebase/firebaseFunctions';
import { gilroyExtra } from '../App';

const trepirLogo = require('../assets/logo3.png');

const isActiveStyle = {
	textDecoration: 'none',
	backgroundColor: '#eee',
};

const pages = [
	<NavLink
		to="/discover"
		style={({ isActive }: any) => (isActive ? isActiveStyle : {})}
	>
		Discover
	</NavLink>,
	<NavLink
		to="/dashboard"
		style={({ isActive }: any) => (isActive ? isActiveStyle : {})}
	>
		Dashboard
	</NavLink>,
	<NavLink
		to="/playground"
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
	const displayName = useSelector(selectDisplayName);

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

	return (
		<AppBar position="static" sx={{ zIndex: 1000 }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters className="navbar-container">
					<div className="navbar-logo">
						<img
							src={trepirLogo}
							alt="trepir-logo"
							style={{ height: '36px', width: '36px' }}
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
								fontWeight: 'bolder',
								letterSpacing: '.3rem',
								color: 'primary',
								textDecoration: 'none',
							}}
						>
							TREPIR
						</Typography>
					</div>
					<div>
						<Box
							sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
							className="navbar-links"
						>
							{/* <IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton> */}
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
								{pages.map((page) => (
									<MenuItem
										key={pages.indexOf(page)}
										onClick={handleCloseNavMenu}
									>
										<Typography
											textAlign="center"
											sx={{
												fontFamily: gilroyExtra,
											}}
										>
											{page}
										</Typography>
									</MenuItem>
								))}
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
							fontWeight: 700,
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
								sx={{ my: 2, color: 'black', display: 'block' }}
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
										fontFamily: gilroyExtra,
										textDecoration: 'none',
									}}
								>
									{displayName}
								</Typography>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											alt={displayName || 'Username'}
											src="/static/images/avatar/2.jpg"
										/>
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
							<Typography textAlign="center" component={Link} to="login">
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
