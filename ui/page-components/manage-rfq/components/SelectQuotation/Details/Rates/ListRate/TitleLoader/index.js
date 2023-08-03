import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function TitleLoader() {
	return (
		<div className={styles.container}>
			<Placeholder height="50px" width="300px" margin="16px" />
			<div className={styles.secondary_container}>
				<Placeholder height="20px" width="300px" margin="0px 0px 10px 0px" />
				<Placeholder height="20px" width="300px" margin="0px 0px 10px 0px" />
			</div>
		</div>
	);
}

export default TitleLoader;
