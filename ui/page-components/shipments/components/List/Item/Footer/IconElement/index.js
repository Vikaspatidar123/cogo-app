import { IcMCustoms, IcMFair, IcMHaulage, IcMShip, IcMTrailorFull } from '@cogoport/icons-react';

import styles from './styles.module.css';

function IconElement({ type = 'land', iconType = 'truck', size = 1.5, className = '' }) {
	let icon = null;
	if (iconType === 'train') {
		icon = <IcMHaulage size={size} />;
	} else if (iconType === 'truck') {
		icon = <IcMTrailorFull size={size} />;
	} else if (iconType === 'ship') {
		icon = <IcMShip size={size} />;
	} else if (iconType === 'customs') {
		icon = <IcMCustoms size={size} />;
	} else if (iconType === 'air' || iconType === 'ic-air') {
		icon = <IcMFair size={size} />;
	}
	return <div className={`${styles.icon} ${styles?.[type]} ${styles?.[className]}`}>{icon}</div>;
}
export default IconElement;
