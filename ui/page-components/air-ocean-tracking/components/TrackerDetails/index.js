import { IcMArrowBack } from '@cogoport/icons-react';

import Header from './Header';
import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

import { useRouter } from '@/packages/next';

function TrackerDetails() {
	const { back } = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<IcMArrowBack width={15} height={15} onClick={back} />
				<h2>Track and Trace</h2>
			</div>
			<Header />
			<TrackingInfo />
		</div>
	);
}

export default TrackerDetails;
