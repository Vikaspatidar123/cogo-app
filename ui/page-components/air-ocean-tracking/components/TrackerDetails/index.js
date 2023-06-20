import { IcMArrowBack } from '@cogoport/icons-react';

import useRedirectFn from '../../hooks/useRedirectFn';

import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

import { useRouter } from '@/packages/next';

function TrackerDetails() {
	const { query } = useRouter();
	const { trackingType = 'ocean' } = query;

	const { redirectToList } = useRedirectFn();
	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<IcMArrowBack width={15} height={15} onClick={() => redirectToList({ type: trackingType })} />
				<h2>Track and Trace</h2>
			</div>
			<TrackingInfo />
		</div>
	);
}

export default TrackerDetails;
