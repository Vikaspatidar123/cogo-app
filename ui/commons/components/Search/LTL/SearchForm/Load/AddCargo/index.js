// import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState, forwardRef } from 'react';

import Gross from './Gross';
import PerPackage from './PerPackage';
import styles from './styles.module.css';

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
				<Tabs
					className="horizontal two"
					activeTab={activeKey}
					onChange={setActiveKey}
					themeType="tertiary"
				>
					<TabPanel
						name="per_package"
						title="Package"
						id="per_package"
					/>
					<TabPanel
						name="gross"
						title="Total/Gross"
						id="gross"
					/>
				</Tabs>
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
