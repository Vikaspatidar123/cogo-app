import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADING_COUNT = [...Array(4).keys()];

function Loading() {
	return (
		<div className={styles.container}>
			{LOADING_COUNT.map((ele) => (
				<div className={styles.card} key={ele}>
					{LOADING_COUNT.map((item) => (
						<div className={styles.loader_div} key={item}>
							<Placeholder margin="8px 0px" height="30px" width="200px" />
						</div>
					))}
				</div>
			))}
		</div>
	);
}
export default Loading;
