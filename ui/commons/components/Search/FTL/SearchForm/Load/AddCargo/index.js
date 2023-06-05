import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState, forwardRef } from 'react';

import Gross from './Gross';
import PerPackage from './PerPackage';
import styles from './styles.module.css';

function AddCargo(
	{ setLoadData = () => {}, loadData = {}, setShowPopover },
	ref,
) {
	const [activeKey, setActiveKey] = useState('per_package');

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<p className={styles.heading}>Select Type:</p>

				<Tabs
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
					setActiveKey={setActiveKey}
				/>
			) : (
				<Gross
					setLoadData={setLoadData}
					loadData={loadData}
					ref={ref}
					setShowPopover={setShowPopover}
					setActiveKey={setActiveKey}
				/>
			)}

		</div>
	);
}

export default forwardRef(AddCargo);
