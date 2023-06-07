import styles from './styles.module.css';

import { renderValue } from '@/ui/page-components/shipments/components/CargoDetails/CargoDetailPills/renderValue';

function Item({ label, elementKey, detail }) {
	const valueFormatted = renderValue(elementKey, detail);

	return valueFormatted ? (
		<div className={styles.container}>
			<div className={styles.key}>
				{label}
				{' '}
				:
				{' '}
			</div>
			<div className={`${styles.state} ${styles.value}`}>{valueFormatted}</div>
		</div>
	) : null;
}

export default Item;
