import { SERVICE_NAME_TITLE_MAPPING } from '../../constants/service-name-title-mapping';

import styles from './styles.module.css';

function Title({ serviceName = '' }) {
	return (
		<div>
			<div className={styles.title_1}>
				Share Your Experience with
			</div>
			<div className={styles.title_2}>
				{SERVICE_NAME_TITLE_MAPPING[serviceName]}
			</div>
		</div>
	);
}

export default Title;
