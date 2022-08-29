import { primaryColor } from '../../App';

const logo = require('../assets/logo-white.png');
const android = require('../assets/android.png');
const apple = require('../assets/apple.png');

function LandingMobile() {
	return (
		<div
			style={{
				padding: '0% 10% 0% 10%',
				wordWrap: 'break-word',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: primaryColor,
				color: 'white',
				textAlign: 'center',
				fontWeight: 'bold',
			}}
		>
			<img
				src={logo}
				alt="logo"
				style={{ height: 135, width: 150, paddingBottom: '2rem' }}
			/>
			<p>Trepir Web is best experienced on a full-sized screen.</p>
			<div>
				<p>Mobile app coming soon to</p>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<img src={android} alt="android" style={{ height: 45, width: 150 }} />
				<img src={apple} alt="apple" style={{ height: 50, width: 150 }} />
			</div>
		</div>
	);
}

export default LandingMobile;
