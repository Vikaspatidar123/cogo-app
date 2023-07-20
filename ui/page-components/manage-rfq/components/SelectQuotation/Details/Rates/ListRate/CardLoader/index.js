import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function CardLoader() {
	return (
		<div className={styles.container}>
			<div className={styles.primary_container}>
				<Placeholder height="40px" width="40px" type="circle" radius="60px" />
				<Placeholder height="30px" width="400px" />
			</div>

			<div className={styles.secondary_container}>
				<Placeholder width="100%" height="70px" />
			</div>
			<div className={styles.third_container}>
				<Placeholder width="100px" height="30px" />
			</div>
		</div>
	);
}

export default CardLoader;
