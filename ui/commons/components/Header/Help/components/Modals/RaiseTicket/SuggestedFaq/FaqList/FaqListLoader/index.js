import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const ARRAY_SIZE = 6;
const EMPTY_ARR = [...Array(ARRAY_SIZE).keys()];

function FaqListLoader() {
	return (
		<div>
			{EMPTY_ARR.map((item) => (
				<div key={item}>
					<Placeholder className={styles.loading_skeleton} />
				</div>
			))}
		</div>
	);
}

export default FaqListLoader;
