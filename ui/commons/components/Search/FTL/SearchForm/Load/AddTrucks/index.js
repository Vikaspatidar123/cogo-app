import React, { forwardRef } from 'react';

import Multitruck from './MultiTruck';
import styles from './styles.module.css';

function AddTruck({ setLoadData, loadData, setShowPopover, location }, ref) {
	return (
		<div className={styles.container}>
			<Multitruck
				setLoadData={setLoadData}
				loadData={loadData}
				setShowPopover={setShowPopover}
				ref={ref}
				location={location}
			/>
		</div>
	);
}

export default forwardRef(AddTruck);
