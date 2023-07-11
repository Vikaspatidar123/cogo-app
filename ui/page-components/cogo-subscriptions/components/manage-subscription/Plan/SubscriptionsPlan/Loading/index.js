import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.container}>
			{[...Array(4).keys()].map((ele) => (
				<div className={styles.card} key={ele}>
					{[...Array(4).keys()].map((item) => (
						<div className={styles.Loader_div} key={item}>
							<Placeholder margin="8px 0px" height="30px" width="200px" />
						</div>
					))}
				</div>
			))}
		</div>
	);
}
export default Loading;
