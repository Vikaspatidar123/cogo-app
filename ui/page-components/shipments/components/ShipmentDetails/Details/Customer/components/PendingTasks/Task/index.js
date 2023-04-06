import { Placeholder } from '@cogoport/components';
import { useEffect } from 'react';

import ExecuteTask from './ExecuteTask';
import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

const Loader = (
	<div className={styles.placeholder}>
		<Placeholder />
		<Placeholder />
		<Placeholder />
		<Placeholder />
		<Placeholder />
		<Placeholder />
	</div>
);

function Task({
	task = {},
	onCancel = () => {},
	refetch = () => {},
	tasksLoading,
	shipment_data,
	primary_service,
	timeLineRefetch = () => {},
	selectedMail,
	setSelectedMail,
	childShipmentservices = [],
	isChildShipment = false,
	refetchServices = () => {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_services',
		method : 'get',
	}, { manual: true });
	const params = {
		filters    : { shipment_id: shipment_data?.id },
		page_limit : 50,
	};
	useEffect(() => {
		trigger({ params });
	}, [shipment_data]);
	const services = isChildShipment ? childShipmentservices : data?.list || [];

	return (
		<div>
			{tasksLoading || loading ? (
				Loader
			) : (
				<ExecuteTask
					services_data={data}
					task={task}
					onCancel={onCancel}
					refetch={refetch}
					shipment_data={shipment_data}
					primary_service={primary_service}
					Loader={Loader}
					timeLineRefetch={timeLineRefetch}
					services={services}
					selectedMail={selectedMail}
					setSelectedMail={setSelectedMail}
					refetchServices={refetchServices}
				/>
			)}
		</div>
	);
}

export default Task;
