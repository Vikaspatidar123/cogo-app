import { IcCStar } from '@cogoport/icons-react';

import styles from './styles.module.css';

function MenuTitle({ setShow = () => {} }) {
	return (
		<div className={styles.container}>
			<IcCStar className={styles.icon} />
			<div
				className={styles.a_container}
				onClick={() => setShow(true)}
				role="presentation"
			>
				Rate Us
			</div>
		</div>
	);
}

export default MenuTitle;
