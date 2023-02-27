import List from '../../../../../common/List';
import { HSCode } from '../../../../../configurations/HsCode';

function HScode({
	hscodeData,
	hsloading,
	pageObj,
	setGlobalFilters,
	refetchHsCode,
	headCode,
	headingToggle,
}) {
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
