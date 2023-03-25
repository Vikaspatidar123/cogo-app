import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import React, { useState, forwardRef } from 'react';

import Gross from './Gross';
import PerPackage from './PerPackage';
import styles from './styles.module.css';
import TabOptions from './TabOptions.json';

function AddCargo(
	{ setLoadData = () => {}, loadData = {}, setShowPopover },
	ref,
) {
	const { sub_active_tab } = loadData;

	const [activeKey, setActiveKey] = useState(sub_active_tab);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.heading}>Select Type:</div>
				<SegmentedControl
					options={TabOptions}
					activeTab={activeKey}
					setActiveTab={setActiveKey}
				/>
			</div>

			{activeKey === 'per_package' ? (
				<PerPackage
					setLoadData={setLoadData}
					loadData={loadData}
					ref={ref}
					setShowPopover={setShowPopover}
				/>
			) : (
				<Gross
					setLoadData={setLoadData}
					loadData={loadData}
					ref={ref}
					setShowPopover={setShowPopover}
				/>
			)}
		</div>
	);
}

export default forwardRef(AddCargo);
