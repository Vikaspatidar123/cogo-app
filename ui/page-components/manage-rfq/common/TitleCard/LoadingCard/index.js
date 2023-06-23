import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingCard() {
	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<Placeholder height="25px" width="6%" type="circle" radius="60px" />
				<Placeholder height="40px" width="40%" style={{ borderRadius: '4px' }} />
				<Placeholder height="20px" width="5%" style={{ borderRadius: '4px' }} />
				<Placeholder height="40px" width="40%" style={{ borderRadius: '4px' }} />
			</div>
			<div className={styles.left_container}>
				{[...Array(4)].map(() => (
					<Placeholder height="30px" width="15%" style={{ borderRadius: '4px' }} />
				))}
			</div>
		</div>
	);
}

export default LoadingCard;
