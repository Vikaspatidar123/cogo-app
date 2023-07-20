import { useTranslation } from 'next-i18next';
import { useState, useMemo } from 'react';

import getOptions from './utils/options-mapping';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const useAccountDetails = () => {
	const { t } = useTranslation(['settings']);

	const { push } = useRouter();

	const { query = {} } = useSelector((state) => state.general);

	const OPTIONS_MAPPING = getOptions({ t });

	const [activeTab, setActiveTab] = useState(
		query.activeTab || Object.keys(OPTIONS_MAPPING)[0],
	);

	const { tabOptions = [] } = useMemo(() => {
		const options = Object.values(OPTIONS_MAPPING);

		return options?.reduce(
			(previousValues, currentOption) => {
				const { key = '', title = '', icon = '' } = currentOption;

				const newTabOptions = [
					...(previousValues?.tabOptions || []),
					{ key, title, icon },
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
		if (obj !== activeTab) push(`/settings?activeTab=${obj}`);
	};

	return {
		activeTab,
		handleChangeTab,
		tabOptions,
		OPTIONS_MAPPING,
	};
};

export default useAccountDetails;
