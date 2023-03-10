import { forwardRef } from 'react';

import Details from './Details';
import styles from './styles.module.css';
import Transportation from './Transportation';

function AllDetails({ transportMode = 'OCEAN' }, ref) {
	return (
		<div className={styles.container}>
			<div className={styles.map}>
				{/* maps */}
			</div>
			<div className={styles.transport}>
				<Transportation />
			</div>
			<div className={styles.details}>
				<Details transportMode={transportMode} ref={ref} />
			</div>
		</div>
	);
}

export default forwardRef(AllDetails);
