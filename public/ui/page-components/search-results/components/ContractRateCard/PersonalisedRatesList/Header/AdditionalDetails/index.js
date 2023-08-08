import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';
import ToolTipContent from './ToolTipContent';

function AdditionalDetails({ touch_point_locations = [] }) {
	const leftPincodes = touch_point_locations.slice(
		1,
		touch_point_locations.length,
	);

	return (
		<div className={styles.container}>
			<div className={styles.touch_points}>
				Touch Points (
				{touch_point_locations.length}
				):
			</div>
			<div className={styles.pin_code}>
				{touch_point_locations?.[0]?.name}
				<Tooltip
					placement="bottom"
					content={<ToolTipContent leftPincodes={leftPincodes} />}
					theme="light"
				>
					{touch_point_locations.length > 1 && (
						<div className={styles.pin_code_link}>
							+
							{touch_point_locations.length - 1}
						</div>
					)}
				</Tooltip>
			</div>
		</div>
	);
}

export default AdditionalDetails;
