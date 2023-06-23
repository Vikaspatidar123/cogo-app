import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingCard() {
	return (
		<>
			{[...Array(4)].map(() => (
				<div className={styles.container}>
					<Placeholder type="circle" radius="60px" height="25px" width="7%" />
					<Placeholder height="50px" width="40%" />
					<Placeholder height="20px" width="5%" />
					<Placeholder height="50px" width="40%" />
				</div>
			))}
		</>
	);
}

export default LoadingCard;
