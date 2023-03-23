import React, { useState, forwardRef } from 'react';
import SegmentedControl from '@cogoport/front/components/SegmentedControl';
import { Container, Wrapper, Heading } from './styles';
import PerPackage from './PerPackage';
import TabOptions from './TabOptions.json';
import Gross from './Gross';

const AddCargo = (
	{ setLoadData = () => {}, loadData = {}, setShowPopover },
	ref,
) => {
	const { sub_active_tab } = loadData;

	const [activeKey, setActiveKey] = useState(sub_active_tab);

	return (
		<Container>
			<Wrapper>
				<Heading>Select Type:</Heading>
				<SegmentedControl
					options={TabOptions}
					activeTab={activeKey}
					setActiveTab={setActiveKey}
				/>
			</Wrapper>

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
		</Container>
	);
};

export default forwardRef(AddCargo);
