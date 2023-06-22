import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const Loader = () => [...Array(3)].map(() => (
	<div className={styles.card}>
		{[...Array(3)].map(() => (
			<Placeholder height="30px" width="25%" margin="10px 10px" />
		))}
	</div>
));

export default Loader;
