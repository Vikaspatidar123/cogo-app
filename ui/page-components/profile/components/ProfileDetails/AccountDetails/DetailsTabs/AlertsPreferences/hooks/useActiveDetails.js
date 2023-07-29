import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getOptions from '../../../utils/alerts-mapping';

const useAccountDetails = () => {
	const { t } = useTranslation(['settings']);

	const OPTIONS_MAPPING = getOptions({ t });
	const controlKey = Object.keys(OPTIONS_MAPPING);
	const controlValues = Object.values(OPTIONS_MAPPING);
	const [activeTab, setActiveTab] = useState(controlKey[0]);

	return {
		activeTab,
		OPTIONS_MAPPING,
		setActiveTab,
		controlKey,
		controlValues,
	};
};

export default useAccountDetails;
