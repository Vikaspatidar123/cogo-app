import getFreightMapping from '../FreightMapping';

import styles from './styles.module.css';

function ServiceTypeIcon({ freight_type = 'fcl_freight' }) {
	const freight = getFreightMapping();

	return (
		<>
			<div
				className={styles.icon_wrapper}
				style={{ background: freight[freight_type]?.bgColor }}
			>
				{freight[freight_type]?.icon}
			</div>
			<text size="12px" style={{ fontWeight: 700 }}>
				{freight[freight_type]?.name}
			</text>
		</>
	);
}

export default ServiceTypeIcon;
