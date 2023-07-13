import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function CheckoutPageLoader() {
	return (
		<div className={styles.loader_container}>
			{[...Array(3).keys()].map(() => (
				<Placeholder
					height="600px"
					width="96%"
					margin="30px 10px 20px 10px"
					className={styles.loader}
				/>
			))}
		</div>
	);
}

export default CheckoutPageLoader;
