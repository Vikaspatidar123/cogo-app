import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.container}>
			{[...Array(6).keys()].map((element) => (
				<div className={styles.thumb_nail} key={element}>
					<Placeholder width="100%" height="80px" margin="12px 0px" />
					<Placeholder width="100%" height="20px" />
				</div>
			))}
		</div>
	);
}

export default Loading;
