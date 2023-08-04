import getFreightMapping from '../getFreightMapping';

import styles from './styles.module.css';

const freight = getFreightMapping();

function ServiceTypeIcon({ freight_type = 'fcl_freight' }) {
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
