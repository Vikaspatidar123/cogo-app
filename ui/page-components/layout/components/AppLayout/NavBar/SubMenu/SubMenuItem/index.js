/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
	IcMRateManagement, IcMRateSheets, IcMDocument,
} from '@cogoport/icons-react';

import AirSchedule from './air-schedule.svg';
import AirTracking from './air-tracking.svg';
import ManageSubscription from './manage-subscription.svg';
import OceanSchedule from './ocean-schedule.svg';
import OceanTracking from './ocean-tracking.svg';
import ProductClassification from './product-classification.svg';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const ICON_MAPPING = {
	'Ocean Tracking': OceanTracking,
	'Air Tracking': AirTracking,
	'Air Schedules': AirSchedule,
	'Ocean Schedules': OceanSchedule,
	'Manage Subscriptions': ManageSubscription,
	'Rates Sheet': IcMRateSheets,
	'Rates Management': IcMRateManagement,
	'Product Classification': ProductClassification,
	Documents: IcMDocument,
};

function SubMenuItem({ item }) {
	const { push } = useRouter();
	const {
		href = '', title = '', description = '', icon = '', as = '',
	} = item || {};
	const { profile } = useSelector((s) => s);
	const { organization, branch } = profile || {};
	const onSubmit = () => {
		if (href?.includes('/v2')) {
			const newHref = href?.replace('/v2', '');
			const newAs = as?.replace('/v2', '');
			push(newHref, newAs);
			// window.location.href = `/v2/${organization?.id}/${branch?.id}/${newHref || newAs}`;
		} else {
			window.location.href = `/app/${organization?.id}/${branch?.id}/importer-exporter/${href || as}`;
		}
	};
	const Element = ICON_MAPPING[title] || AirSchedule;

	return (
		<div
			className={styles.container}
			onClick={() => onSubmit()}
		// className={ unPrefixedPath === item.href ? 'active' : className}

		>
			{/* {icon && ( */}
			<Element />
			{/* )} */}

			{!icon && <div style={{ width: 45, height: 45 }} />}
			<div className={styles.main}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{description}</div>
			</div>
		</div>
	);
}

export default SubMenuItem;
