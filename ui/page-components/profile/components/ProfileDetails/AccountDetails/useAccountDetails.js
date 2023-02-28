import { useState, useMemo } from 'react';

import getOptions from './utils/options-mapping';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const useAccountDetails = () => {
	const { query = {} } = useSelector((state) => state.general);

	const router = useRouter();

	const OPTIONS_MAPPING = getOptions();

	const [activeTab, setActiveTab] = useState(
		query.activeTab || Object.keys(OPTIONS_MAPPING)[0],
	);

	const { tabOptions = [] } = useMemo(() => {
		const options = Object.values(OPTIONS_MAPPING);

		return options?.reduce(
			(previousValues, currentOption) => {
				const { key = '', title = '' } = currentOption;

				const newTabOptions = [
					...(previousValues?.tabOptions || []),
					{ key, title },
				];

				return {
					...(previousValues || {}),
					tabOptions: newTabOptions,
				};
			},
			{ selectOptions: [], tabOptions: [] },
		);
	}, [OPTIONS_MAPPING]);

	const handleChangeTab = (obj) => {
		setActiveTab(obj);
		if (obj !== activeTab) router.push(`/settings?activeTab=${obj}`);
	};

	return {
		activeTab,
		handleChangeTab,
		tabOptions,
		OPTIONS_MAPPING,
	};
};

export default useAccountDetails;
