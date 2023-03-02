import { IcMCross } from '@cogoport/icons-react';

import styles from './styles.module.css';

function FilterComponent({ filters, setFilters, showFilters, setShowFilters }) {
	console.log('showFilters', showFilters);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.text}>
					Filters
				</div>
				<div role="presentation" className={styles.cross} onClick={() => { setShowFilters(false); }}>
					<IcMCross />
				</div>
			</div>
			<div />
		</div>
	);
}

export default FilterComponent;
