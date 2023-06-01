import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function RenderTitle({ title }) {
	return (
		<div className={cl`${styles.flex_box} ${styles.container}`}>
			<div className={styles.title}>{title}</div>
			<div className={styles.pattern}>
				<div className={cl`${styles.flex_box} ${styles.pattern_container}`}>
					<div className={styles.dot} />
					<div className={styles.line} />
				</div>
			</div>
		</div>
	);
}

export default RenderTitle;
