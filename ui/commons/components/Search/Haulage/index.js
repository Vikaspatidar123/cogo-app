import { useState, useMemo } from 'react';
import SearchForm from '@cogo/app-search/common/SearchForm/index.js';
import SegmentedControl from '@cogoport/front/components/SegmentedControl';

import { Flex, Text } from '@cogoport/front/components';

const CONSTANT_KEYS = {
	TRAILER_FREIGHT: 'trailer_freight',
	HAULAGE_FREIGHT: 'haulage_freight',
};

const { TRAILER_FREIGHT, HAULAGE_FREIGHT } = CONSTANT_KEYS;

const SERVICE_TYPE_OPTIONS = [
	{ label: 'Trailer', value: TRAILER_FREIGHT },
	{ label: 'Rail', value: HAULAGE_FREIGHT },
];

const Haulage = ({ extraParams }) => {
	const [serviceType, setServiceType] = useState(TRAILER_FREIGHT);

	const componentProps = {
		[TRAILER_FREIGHT]: {
			mode: TRAILER_FREIGHT,
			extraParams,
		},
		[HAULAGE_FREIGHT]: {
			mode: HAULAGE_FREIGHT,
			extraParams,
		},
	};

	const SERVICE_TYPE_COMPONENT_MAPPING = useMemo(() => {
		return {
			[TRAILER_FREIGHT]: SearchForm,
			[HAULAGE_FREIGHT]: SearchForm,
		};
	}, []);

	const ActiveSearchComponent =
		SERVICE_TYPE_COMPONENT_MAPPING[serviceType] || null;

	return (
		<Flex direction="column" margin="0 16px">
			<Flex direction="column" marginBottom={16}>
				<Text as="div" marginBottom={2} color="#393F70">
					Select Service Type
				</Text>

				<Flex>
					<SegmentedControl
						options={SERVICE_TYPE_OPTIONS}
						activeTab={serviceType}
						setActiveTab={setServiceType}
						separatorMarginRight={4}
					/>
				</Flex>
			</Flex>

			{ActiveSearchComponent && (
				<ActiveSearchComponent
					key={serviceType}
					{...(componentProps[serviceType] || {})}
				/>
			)}
		</Flex>
	);
};

export default Haulage;
