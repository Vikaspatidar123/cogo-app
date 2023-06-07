import styles from './styles.module.css';

function RenderTouchPoints(props) {
	const { forward_touch_points = [], return_touch_points = [] } = props;

	return (
		<div className={styles.flex}>
			{forward_touch_points.length > 0 ? (
				<div className={styles.container}>
					<div
						color="#393f70"
						size={16}
						textDecoration="underline"
						style={{ padding: '8px' }}
						fontWeight={500}
					>
						Forward Touch Points
					</div>

					{forward_touch_points.map((touchPoint) => (
						<div className={`${styles.location_div} ${styles.box}`} key={touchPoint.display_name}>
							<div className={styles.dot} />
							<div className={`${styles.horizontal_line} ${styles.line}`} />
							<div className={styles.location}>{touchPoint.display_name}</div>
						</div>
					))}
				</div>
			) : null}

			{return_touch_points.length > 0 ? (
				<div className={styles.container}>
					<div
						color="#393f70"
						size={16}
						textDecoration="underline"
						style={{ padding: '8px' }}
						fontWeight={500}
					>
						Return Touch Points
					</div>

					{return_touch_points.map((touchPoint) => (
						<div className={`${styles.location_div} ${styles.box}`} key={touchPoint.display_name}>
							<div className={styles.dot} />
							<div className={`${styles.horizontal_line} ${styles.line}`} />
							<div className={styles.location}>{touchPoint.display_name}</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

export default RenderTouchPoints;
