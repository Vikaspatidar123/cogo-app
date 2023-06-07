import { Skeleton } from '@cogoport/components/';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.skeleton_wrapper}>
			{new Array(3).map((ele) => (
				<div key={ele}>
					{new Array(3).key(1).map(() => (
						<div className={styles.skeleton_div}>
							<Skeleton width="300px" height="50px" margin={10} />
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default Loader;
