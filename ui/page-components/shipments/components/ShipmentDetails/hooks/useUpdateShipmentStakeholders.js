import { Toast } from '@cogoport/components';
import { useState, useContext } from 'react';

import partner_controls, { possibleStakeholders, controlsForAddingStakeholder } from '../../../utils/partner-controls';
import { ShipmentDetailContext } from '../common/Context';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';

const useUpdateShipmentStakeholders = ({
	stakeholder_type: oldStakeholderType,
	data = {},
	stakeholderListRefetch = () => {},
	setEditStakeHolder = () => {},
}) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const [errors, setErrors] = useState({});
	const { service_id = '', service_type = '', user = '' } = data;

	const addControls = controlsForAddingStakeholder(shipment_data);

	const controls = partner_controls(user);

	let finalControls = controls;

	if (!oldStakeholderType) {
		finalControls = [...addControls, ...controls];
	}

	const {
		control,
		watch,
		handleSubmit,
		setValue,
		reset,
	} = useForm(finalControls);

	const formValues = watch();

	const stakeholder_type = formValues.stakeholder_type || oldStakeholderType;

	const config = possibleStakeholders[stakeholder_type];

	const showElements = {
		stakeholder_id : !!stakeholder_type,
		service_id     : ![
			'booking_agent',
			'sales_agent',
			'entity_manager',
			'portfolio_manager',
			'lastmile_ops',
		].includes(stakeholder_type),
	};
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_stakeholders',
		method : 'post',
	}, { manual: true });

	const onError = (err) => {
		setErrors(err);
	};

	const choosenService = (shipment_data.all_services || []).find(
		(service) => service.id === formValues.service_id,
	);

	const updateStakeHolder = async () => {
		try {
			const params = {
				id             : shipment_data?.id,
				stakeholder_id : formValues.stakeholder_id,
				service_id     : formValues.service_id || service_id || undefined,
				service_type   : choosenService?.service_type || service_type || undefined,
				stakeholder_type,
			};

			const res = await trigger({ data: params });

			if (!res.hasError) {
				Toast.success('Stakeholder updated!');
				stakeholderListRefetch();
				setEditStakeHolder({ modal_check: false, data: {} });
			}
		} catch (error) {
			Toast.error('Stakeholder not updated');
		}
	};

	return {
		controls: finalControls,
		control,
		handleSubmit,
		onError,
		updateStakeHolder,
		errors,
		setValue,
		formValues,
		config,
		user,
		reset,
		showElements,
		loading,
	};
};

export default useUpdateShipmentStakeholders;
