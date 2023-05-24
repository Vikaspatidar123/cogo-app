import getFreightMapping from '../../common/FreightMapping';

import styles from './styles.module.css';

function ServiceTypeIcon({ freight_type = 'fcl_freight' }) {
	const freight = getFreightMapping();

	return (
		<>
			<div
				className={styles.icon_wrapper}
				style={{ padding: '0.7rem', marginRight: '0.5rem', background: freight[freight_type]?.bgColor }}
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
