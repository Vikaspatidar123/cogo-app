import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Stepper({ originPort = {}, destinationPort = {} }) {
	const { t } = useTranslation(['frt']);
	return (
		<>
			<div className={styles.dot_circle}>
				<div className={styles.circle} />
				<div className={styles.line} />
				<div className={styles.circle} />
			</div>

			<div className={styles.port_code}>
				<span>{originPort?.port_code || t('frt:stepper_origin')}</span>
				<span>{destinationPort?.port_code || t('frt:stepper_origin') }</span>
			</div>
		</>
	);
}

export default Stepper;
