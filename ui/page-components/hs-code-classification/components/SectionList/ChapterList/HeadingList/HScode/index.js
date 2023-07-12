import { useTranslation } from 'next-i18next';

import List from '../../../../../common/List';
import { getHSCodeControls } from '../../../../../configurations/HsCode';

function HScode({
	hscodeData,
	hsloading,
	pageObj,
	setGlobalFilters,
	refetchHsCode,
	headCode,
	headingToggle,
}) {
	const { t } = useTranslation(['common', 'hsClassification']);

	const HSCode = getHSCodeControls({ t });

	return (
		<List
			className="hsCode"
			apiData={hscodeData}
			configs={HSCode}
			loading={hsloading}
			pageObj={pageObj}
			setGlobalFilters={setGlobalFilters}
			headCode={headCode}
			refetchHsCode={refetchHsCode}
			headingToggle={headingToggle}
		/>
	);
}

export default HScode;
