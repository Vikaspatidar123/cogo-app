import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function SopLoading() {
	return (
		<div>
			<div className={styles.row}>
				<Placeholder margin="10px 60px 20px 20px" />
				<Placeholder margin="10px 20px 20px 60px" />
			</div>
			<div className={styles.line} />
			<div className={styles.container}>
				<div className={styles.select}>
					<Placeholder margin="10px 60px 20px 20px" />
				</div>
				<div className={styles.input_loading}>
					<Placeholder margin="10px 60px 20px 20px" />
					<Placeholder margin="10px 60px 20px 20px" />
				</div>

			</div>

		</div>
	);
}
export default SopLoading;
