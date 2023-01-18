import { IcMRateManagement, IcMRateSheets } from '@cogoport/icons-react';

import AirSchedule from './air-schedule.svg';
import AirTracking from './air-tracking.svg';
import ManageSubscription from './manage-subscription.svg';
import OceanSchedule from './ocean-schedule.svg';
import OceanTracking from './ocean-tracking.svg';
import ProductClassification from './product-classification.svg';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

const ICON_MAPPING = {
	'Ocean Tracking'         : OceanTracking,
	'Air Tracking'           : AirTracking,
	'Air Schedules'          : AirSchedule,
	'Ocean Schedules'        : OceanSchedule,
	'Manage Subscriptions'   : ManageSubscription,
	'Rates Sheet'            : IcMRateSheets,
	'Rates Management'       : IcMRateManagement,
	'Product Classification' : ProductClassification,
};

function SubMenuItem({ item }) {
	const { unPrefixedPath } = useSelector(({ general }) => general);

	const Icon = ICON_MAPPING[item.label];
	const rates = [IcMRateManagement, IcMRateSheets];
	let className = '';
	if (rates.includes(Icon)) {
		className = 'rate';
	}

	return (
		<div
			className={styles.container}
			// href={item.href}
			// as={item.as}
			// className={ unPrefixedPath === item.href ? 'active' : className}

		>
			{Icon && !rates.includes(Icon) && (
				<Icon width="45px" height="45px" style={{ flexShrink: 0 }} />
			)}
			{className === 'rate' && (
				<Icon
					width="45px"
					height="45px"
					style={{ flexShrink: 0 }}
					fill="#3CB371"
				/>
			)}
			{!Icon && <div style={{ width: 45, height: 45 }} />}
			<div className={styles.main}>
				<div className={styles.title}>{item.label}</div>
				<div className={styles.description}>{item.description}</div>
			</div>
		</div>
	);
}

export default SubMenuItem;
