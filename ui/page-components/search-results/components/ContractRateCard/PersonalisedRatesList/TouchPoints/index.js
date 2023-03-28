import { Tooltip, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import RenderTouchPoints from './RenderTouchPoints';
import styles from './styles.module.css';

function TouchPoints(props) {
	const { touch_points, service_type, transit_time } = props;
	const { forward_touch_points = [], return_touch_points = [] } =		touch_points || {};

	if (
		(service_type === 'ltl_freight' || service_type === 'air_freight')
		&& transit_time
	) {
		return (
			<div className={styles.col}>
				<div className={styles.transit_div}>
					<div className={styles.transit_heading}>Transit Time:</div>
					<div className={styles.days}>{transit_time}</div>
				</div>
			</div>
		);
	}

	if (service_type === 'ftl_freight') {
		return (
			<div className={styles.col}>
				<div className={styles.touch_container}>
					<div className={styles.touch_points_name}>
						Touch Points
						<div style={{ fontWeight: 'bold' }}>
							(
							{forward_touch_points.length + return_touch_points.length}
							)
						</div>
					</div>

					{!isEmpty(forward_touch_points) || !isEmpty(return_touch_points) ? (
						<Tooltip
							theme="light"
							placement="right"
							content={(
								<RenderTouchPoints
									forward_touch_points={forward_touch_points}
									return_touch_points={return_touch_points}
								/>
							)}
						>
							<Button
								className="primary sm text"
								style={{ textTransform: 'capitalize' }}
							>
								View Details
							</Button>
						</Tooltip>
					) : null}
				</div>
			</div>
		);
	}
	return null;
}

export default TouchPoints;
