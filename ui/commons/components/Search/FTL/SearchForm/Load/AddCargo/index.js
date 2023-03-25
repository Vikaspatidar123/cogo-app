// import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import { Popover, Tabs, TabPanel } from '@cogoport/components';
import React, { useState, forwardRef } from 'react';

import Gross from './Gross';
import PerPackage from './PerPackage';
import styles from './styles.module.css';
import TabOptions from './TabOptions.json';

function AddCargo(
	{ setLoadData = () => {}, loadData = {}, setShowPopover },
	ref,
) {
	// const { sub_active_tab } = loadData;
	const [activeKey, setActiveKey] = useState('per_package');

	return (
		<div className={styles.container}>
			<p className={styles.heading}>Select Type:</p>

			{/* <div className={styles.wrapper}> */}
			<Tabs
				className="horizontal two"
				activeTab={activeKey}
				onChange={setActiveKey}
				themeType="primary"
			>
				<TabPanel
					name="per_package"
					title="Package"
					id="per_package"
					className="horizontal two"
					setLoadData={setActiveKey}
				>
					<PerPackage
						setLoadData={setLoadData}
						loadData={loadData}
						ref={ref}
						setShowPopover={setShowPopover}
						setActiveKey={setActiveKey}
					/>
				</TabPanel>
				<TabPanel
					name="gross"
					title="Total/Gross"
					id="gross"
					setLoadData={setActiveKey}
				>
					<Gross
						setLoadData={setLoadData}
						loadData={loadData}
						ref={ref}
						setShowPopover={setShowPopover}
						setActiveKey={setActiveKey}
					/>
				</TabPanel>
			</Tabs>

		</div>
	);
}

export default forwardRef(AddCargo);
