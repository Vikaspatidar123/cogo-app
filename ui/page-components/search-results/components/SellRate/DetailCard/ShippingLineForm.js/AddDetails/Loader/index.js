import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const array = new Array(2).fill(0);

function Loader() {
	return (
		<div className={styles.container}>
			{array.map(() => (
				<div className={styles.detail_icon}>
					<Placeholder height="20px" width="200px" />

					<div className={styles.details}>
						<Placeholder height="30px" width="150px" />
						<Placeholder height="30px" width="150px" />
						<Placeholder height="30px" width="150px" />
						<Placeholder height="30px" width="150px" />
						<Placeholder height="30px" width="150px" />
					</div>
					<div />
					<div className={styles.btn_icon}>
						<Placeholder height="30px" width="100px" />
					</div>
				</div>
			))}
		</div>
	);
}

export default Loader;
