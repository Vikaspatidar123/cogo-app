/* eslint-disable no-unused-vars */
import MobileHeader from '../../../../MobileHeader';

import Categories from './Categories';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function AlertsPreferences() {
	const { push } = useRouter();

	const onClickBackButton = () => {
		push('/settings');
	};

	return (
		<>
			<MobileHeader
				heading="Alerts & Preferences"
				onClickBackButton={onClickBackButton}
			/>

			<div className={styles.main_container}>
				<div className={styles.header_container}>Alerts and Preferences</div>

				<Categories />
			</div>
		</>
	);
}

export default AlertsPreferences;
