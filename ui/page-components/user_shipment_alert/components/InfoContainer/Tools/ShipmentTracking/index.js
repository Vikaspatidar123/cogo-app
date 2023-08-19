import { Input, Button } from '@cogoport/components';
import dynamic from 'next/dynamic';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('../../../../../../commons/components/CogoMaps'), { ssr: false });

function ShipmentTracking() {
	return (
		<div className={styles.container}>
			<div className={styles.text}>Track your shipment!</div>
			<CogoMaps height="270px" />
			<div className={styles.input_box}>
				<div>
					<Input className={styles.input} size="sm" />
					<Input className={styles.input} size="sm" />
					<div className={styles.button}>
						<Button themeType="secondary">Track Now</Button>
					</div>
				</div>

			</div>

		</div>
	);
}

export default ShipmentTracking;
