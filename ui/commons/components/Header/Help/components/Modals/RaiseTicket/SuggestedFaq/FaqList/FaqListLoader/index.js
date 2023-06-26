import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function FaqListLoader() {
	return (
		<div>
			{[...Array(6).keys()].map((item) => (
				<div key={item}>
					<Placeholder className={styles.loading_skeleton} />
				</div>
			))}
		</div>
	);
}

export default FaqListLoader;
