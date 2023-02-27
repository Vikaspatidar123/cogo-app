import MobileHeader from '../../../../MobileHeader';

import Categories from './Categories';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function AlertsPreferences() {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const { push } = useRouter();

	const onClickBackButton = () => {
		push('/settings');
	};

	return (
		<>
			{isMobile && (
				<MobileHeader
					heading="Alerts & Preferences"
					onClickBackButton={onClickBackButton}
				/>
			)}

			<div className={styles.main_container}>
				<div className={styles.header_container}>
					Alerts and Preferences
				</div>

				<Categories />
			</div>
		</>
	);
}

export default AlertsPreferences;
