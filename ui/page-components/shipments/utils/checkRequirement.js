import { isEmpty, startCase } from '@cogoport/utils';

const checkForUniqness = (values, uniqeField) => {
	const numbers = (values || []).map((item) => item[uniqeField]);
	let newContainerNumbers = new Set(numbers);
	newContainerNumbers = [...newContainerNumbers];
	if (numbers.length !== newContainerNumbers.length) return true;
	return false;
};

const checkForContainers = (values, count) => {
	let totalCount = 0;
	(values || []).forEach((item) => {
		totalCount += item.container_quantity;
	});
	if (totalCount !== count) return true;
	return false;
};

const checkRequirement = ({
	values,
	config,
	shipment_data,
	setIsLoading,
	setMessage,
}) => {
	if (!values) {
		setIsLoading(false);
		setMessage({ type: 'error', message: 'Please provide required details' });
		return false;
	}

	if (
		config.uniqeField
		&& checkForUniqness(
			(values || {})[config.uniqeFieldDataKey || 'data'],
			config.uniqeField,
		)
	) {
		setMessage({
			type    : 'error',
			message : `Please provide distinct ${startCase(config.uniqeField || '')}`,
		});
		setIsLoading(false);
		return false;
	}

	if (
		config.checkForContainers
		&& checkForContainers(
			(values || {}).documents || [],
			(shipment_data || {}).containers_count,
		)
	) {
		setMessage({
			type    : 'error',
			message : `Containers count in booking notes should be equal to total container 
			count i.e. ${shipment_data.containers_count}`,
		});
		setIsLoading(false);
		return false;
	}

	if (config?.formatType === 'update_carrier_booking_reference_number') {
		if (
			values?.booking_ref_status === 'placed'
			&& isEmpty(values?.booking_reference_number)
			&& isEmpty(values?.booking_reference_proof)
		) {
			setMessage({
				type: 'error',
				message:
					`Booking Reference Number or Booking Reference proof, 
					atleast one is mandatory to complete this task.`,
			});
			setIsLoading(false);
			return false;
		}
	}
	return true;
};

export default checkRequirement;
