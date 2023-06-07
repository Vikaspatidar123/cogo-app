import React from 'react';

import styles from './styles.module.css';

function RenderTouchPointDetails({ isRoundTrip, title, touchPoints }) {
	if ((touchPoints || []).length === 0) {
		return null;
	}

	return (
		<>
			{isRoundTrip ? (
				<div className={styles.title}>
					{title}
					{' '}
					Jounery
				</div>
			) : null}

			{(touchPoints || []).map((touchPoint, idx) => (
				<div className={styles.touch_point_container} key={touchPoint.display_name}>
					<div className={styles.circle} />
					{idx < touchPoints.length - 1 && <div className={styles.line} />}

					<div>
						{' '}
						Touch Point
						{idx + 1}
					</div>
					<div className={styles.div}>
						{touchPoint.name?.split(' ', 1)}
						{' '}
						{touchPoint.display_name?.split('-', 1)}
					</div>
				</div>
			))}
		</>
	);
}

export default RenderTouchPointDetails;
