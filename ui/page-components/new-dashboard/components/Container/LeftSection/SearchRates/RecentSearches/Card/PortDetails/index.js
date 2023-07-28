import { IcMPortArrow } from '@cogoport/icons-react';

import PortName from './PortName';
import styles from './styles.module.css';

import { SUFFIX } from '@/ui/page-components/new-dashboard/constant';

function PortDetails({ data }) {
	const { search_type } = data || {};

	const origin = data[`origin_${SUFFIX[search_type]}`] || {};
	const destination = data[`destination_${SUFFIX[search_type]}`] || {};
	return (
		<div className={styles.container}>
			<PortName location={origin} />
			<IcMPortArrow size={1.1} style={{ margin: '-16px 10px 0' }} />
			<PortName location={destination} />
		</div>
	);
}

export default PortDetails;
