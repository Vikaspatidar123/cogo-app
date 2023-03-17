// import React from 'react';
// import { toast } from 'react-toastify';

import { Toggle } from '@cogoport/components';

// import Switch from '../../../../common/ui/Switch';
// import useFetchDsr from '../../hooks/useFetchDsr';
// import useUpdateDsr from '../../hooks/useUpdateDsr';
import useUpdateDsr from '../../hooks/useUpdateDsr';

function ReportStatus({ dsrId, record, setDsrs }) {
	const { loading, updateDsr } = useUpdateDsr(setDsrs);

	const shipment = record?.shipments;
	const schedules = record?.schedule;
	const status = record?.schedule == null || record.shipments === 0 ? 'inactive' : record.status;

	const handleClick = () => {
		const newStatus = !(status === 'active');
		updateDsr(dsrId, newStatus);
	};
	return (
		<div onClick={() => handleClick()}>
			<Toggle
				checked={status === 'active'}
				onChange={() => handleClick()}
			/>
		</div>

	);
}

export default ReportStatus;
