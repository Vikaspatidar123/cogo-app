import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADER = [...Array(3).keys()];

function CheckoutPageLoader() {
	return (
		<div className={styles.loader_container}>
			{LOADER.map(() => (
				<Placeholder
					height="490px"
					width="96%"
					margin="30px 10px 20px 10px"
					className={styles.loader}
				/>
			))}
		</div>
	);
}

export default CheckoutPageLoader;
