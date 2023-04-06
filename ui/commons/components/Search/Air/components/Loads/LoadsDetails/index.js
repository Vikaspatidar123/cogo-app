// import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import { Chips } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import GrossCargoDetails from './GrossCargoDetails';
import PerPackageCargoDetails from './PerPackageCargoDetails';
import styles from './styles.module.css';

const OPTIONS = [
	{
		children : 'By packing type',
		key      : 'per_package',
	},
	{
		children : 'By shipment total',
		key      : 'gross',
	},
];

function LoadsDetails({
	showPopover = false,
	setShowPopover = () => {},
	showFilledValues = {},
	setShowFilledValues = () => {},
}) {
	const [currentTab, setCurrentTab] = useState(
		!isEmpty(showFilledValues?.gross) ? 'gross' : 'per_package',
	);

	return (
		<div className={styles.container}>
			<div className={styles.segmented_control_container}>
				<Chips
					size="md"
					items={OPTIONS}
					selectedItems={currentTab}
					onItemChange={(value) => {
						setCurrentTab(value);
					}}
				/>
			</div>

			{currentTab === 'per_package' ? (
				<PerPackageCargoDetails
					showPopover={showPopover}
					setShowPopover={setShowPopover}
					showFilledValues={showFilledValues}
					setShowFilledValues={setShowFilledValues}
				/>
			) : null}

			{currentTab === 'gross' ? (
				<GrossCargoDetails
					setShowFilledValues={setShowFilledValues}
					setShowPopover={setShowPopover}
					showFilledValues={showFilledValues}
					setCurrentTab={setCurrentTab}
				/>
			) : null}
		</div>
	);
}

export default LoadsDetails;
