import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import {
	decrement,
	increment,
	incrementByAmount,
	incrementAsync,
	incrementIfOdd,
	selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
	const count = useAppSelector(selectCount);
	const dispatch = useAppDispatch();
	const [incrementAmount, setIncrementAmount] = useState('2');

	const incrementValue = Number(incrementAmount) || 0;

	return (
		<div>
			<div className={styles.row}>
				<button
					className={styles.button}
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
					type="submit"
				>
					-
				</button>
				<span className={styles.value}>{count}</span>
				<button
					className={styles.button}
					aria-label="Increment value"
					onClick={() => dispatch(increment())}
					type="submit"
				>
					+
				</button>
			</div>
			<div className={styles.row}>
				<input
					className={styles.textbox}
					aria-label="Set increment amount"
					value={incrementAmount}
					onChange={(e) => setIncrementAmount(e.target.value)}
				/>
				<button
					className={styles.button}
					onClick={() => dispatch(incrementByAmount(incrementValue))}
					type="submit"
				>
					Add Amount
				</button>
				<button
					className={styles.asyncButton}
					onClick={() => dispatch(incrementAsync(incrementValue))}
					type="submit"
				>
					Add Async
				</button>
				<button
					className={styles.button}
					onClick={() => dispatch(incrementIfOdd(incrementValue))}
					type="submit"
				>
					Add If Odd
				</button>
			</div>
		</div>
	);
}
