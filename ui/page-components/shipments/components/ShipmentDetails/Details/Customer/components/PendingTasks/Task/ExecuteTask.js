import incotermArray from '../../../../../../../constants/inco-terms.json';
import useGetTask from '../../../../../hooks/useGetTask';
import useTaskExecution from '../../../../../hooks/useTaskExecution';

import ExecuteStep from './ExecuteStep';
import styles from './styles.module.css';

function ExecuteTask({
	services_data = {},
	task = {},
	onCancel = () => {},
	refetch = () => {},
	shipment_data = {},
	primary_service = {},
	Loader,
	timeLineRefetch = () => {},
	services = [],
	selectedMail,
}) {
	const incoTerm = shipment_data?.inco_term;
	const tradeType =		incotermArray.find((x) => x.value === incoTerm)?.tradeType
		|| primary_service.trade_type;
	const service_names = (services || []).map((serviceObj) => (serviceObj?.trade_type === 'export'
		? `origin_${serviceObj?.service_type}`
		: `destination_${serviceObj?.service_type}`));

	(services || []).forEach((serviceObj) => {
		service_names.push(serviceObj.service_type);
	});
	const modifiedDataForConfig = {
		...(primary_service || {}),
		origin_port      : primary_service?.origin_port,
		destination_port : primary_service?.destination_port,
		trade_type       : tradeType,
		schedule_arrival:
			primary_service?.schedule_arrival
			|| primary_service?.selected_schedule_arrival,
		schedule_departure:
			primary_service?.schedule_departure
			|| primary_service?.selected_schedule_departure,
		service_names,
		serial_id: shipment_data?.serial_id,
	};

	const { data, loading: getTaskLoading } = useGetTask({
		task,
		// onCancel,
	});

	const {
		steps = [],
		currentStep,
		setCurrentStep,
		serviceIdMapping,
	} = useTaskExecution({
		task,
		data,
		primary_service: modifiedDataForConfig,
		services,
		selectedMail,
		shipment_data,
	});

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - 1]
		: {};

	return (
		<div className={styles.task_container}>
			{getTaskLoading ? (
				Loader
			) : (
				<ExecuteStep
					services_data={services_data}
					task={task}
					stepConfig={stepConfigValue}
					onCancel={onCancel}
					refetch={refetch}
					shipment_data={modifiedDataForConfig}
					isLastStep={currentStep === steps.length - 1}
					currentStep={currentStep}
					setCurrentStep={setCurrentStep}
					serviceIdMapping={serviceIdMapping}
					getApisData={data?.apis_data}
					timeLineRefetch={timeLineRefetch}
					selectedMail={selectedMail}
					uiConfig={data?.task_config?.ui_config[currentStep]}
					services={services}
				/>
			)}
		</div>
	);
}

export default ExecuteTask;
