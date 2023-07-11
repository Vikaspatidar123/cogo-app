import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Loading() {
	return (
		<div className={styles.container}>
			{[...Array(3).keys()].map((ele) => (
				<div className="card" key={ele}>
					{[...Array(3).keys()].map((item) => (
						<div className="Loader_div" key={item}>
							<Placeholder margin="10px 0px" height="30px" width="200px" />
						</div>
					))}
				</div>
			))}
		</div>
	);
}
export default Loading;
