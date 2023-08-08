import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADER_ARR = [...Array(3).keys()];

const Loader = () => LOADER_ARR.map((ele) => (
	<div key={ele} className={styles.card}>
		{LOADER_ARR.map((info) => (
			<Placeholder key={info} height="30px" width="25%" margin="10px 10px" />
		))}
	</div>
));

export default Loader;
