import { Counter } from './features/counter/Counter';
import './ReduxSample.css';

function ReduxSample() {
	return (
		<div className="ReduxSample">
			<header className="ReduxSample-header">
				<Counter />
				<p>
					Edit <code>src/ReduxSample.tsx</code> and save to reload test.
				</p>
				<span>
					<span>Learn </span>
					<a
						className="ReduxSample-link"
						href="https://reactjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						React
					</a>
					<span>, </span>
					<a
						className="ReduxSample-link"
						href="https://redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Redux
					</a>
					<span>, </span>
					<a
						className="ReduxSample-link"
						href="https://redux-toolkit.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Redux Toolkit
					</a>
					,<span> and </span>
					<a
						className="ReduxSample-link"
						href="https://react-redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						React Redux
					</a>
				</span>
			</header>
		</div>
	);
}

export default ReduxSample;
