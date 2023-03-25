import React from 'react';

import ShowGrossInfo from './ShowGrossInfo';
import ShowPackageInfo from './ShowPackageInfo';

function ShowCargoInfo({ loadData = {}, setShowPopover, showPopover }) {
	if (loadData?.sub_active_tab === 'gross') {
		return (
			<ShowGrossInfo
				loadData={loadData}
				setShowPopover={setShowPopover}
				showPopover={showPopover}
			/>
		);
	}

	return (
		<ShowPackageInfo
			loadData={loadData}
			showPopover={showPopover}
			setShowPopover={setShowPopover}
		/>
	);
}

export default ShowCargoInfo;
