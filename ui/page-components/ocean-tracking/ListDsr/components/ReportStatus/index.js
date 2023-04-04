import { Toggle } from '@cogoport/components';

import useUpdateDsr from '../../hooks/useUpdateDsr';

function ReportStatus({ dsrId, record, setDsrs }) {
	const { loading, updateDsr } = useUpdateDsr(setDsrs);
	const status = record?.schedule == null || record.shipments === 0 ? 'inactive' : record.status;

	const handleClick = () => {
		const newStatus = !(status === 'active');
		updateDsr(dsrId, newStatus);
	};
	return (
		<div
			role="presentation"
			onClick={() => handleClick()}
		>
			<Toggle
				checked={status === 'active'}
				onChange={() => handleClick()}
			/>
		</div>

	);
}

export default ReportStatus;
