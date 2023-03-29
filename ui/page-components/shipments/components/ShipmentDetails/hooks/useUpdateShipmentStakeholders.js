// import { useRequest } from '@cogo/commons/hooks';
// import getGeoConstants from '@cogo/globalization/constants/geo';
// import { useSelector } from '@cogo/store';
// import { toast } from '@cogoport/front/components';
// import { useFormCogo } from '@cogoport/front/hooks';
import { Toast } from '@cogoport/components';
import { useState, useContext } from 'react';

import partner_controls, { possibleStakeholders, controlsForAddingStakeholder } from '../../../utils/partner-controls';
import { ShipmentDetailContext } from '../common/Context';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import getGeoConstants from '@/ui/commons/constants/geo';

// import { ShipmentDetailContext } from '../../../commons/Context';
// import useResetErrors from '../../../hooks/useResetErrors';
// import partner_controls, {
// 	possibleStakeholders,
// 	controlsForAddingStakeholder,
// } from '../utils/partner-controls';

const geo = getGeoConstants();

const useUpdateShipmentStakeholders = ({
	stakeholder_type: oldStakeholderType,
	data = {},
	stakeholderListRefetch = () => {},
	setEditStakeHolder = () => {},
}) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const [errors, setErrors] = useState({});
	const { service_id = '', service_type = '', user = '' } = data;

	const agentIdMapping = {
		supply_agent: [
			...geo.uuid.supply_role_ids,
			...geo.uuid.procurement_and_fullfillment_ids,
			...geo.uuid.logistics_agent_ids,
		],
		booking_agent : geo.uuid.kam_ids,
		service_ops1  : geo.uuid.service_ops1_role_ids,
		service_ops2  : geo.uuid.service_ops2_role_id,
		service_ops3  : geo.uuid.service_ops3_role_ids,
	};

	const addControls = controlsForAddingStakeholder(shipment_data);

	const controls = partner_controls(user);

	let finalControls = controls;

	if (!oldStakeholderType) {
		finalControls = [...addControls, ...controls];
	}

	const {
		// fields,
		watch,
		handleSubmit,
		setValue,
		reset,
		formState: { errors: errorVal },
	} = useForm(finalControls);

	// useResetErrors({ errors, setErrors, currentStateErrors: errorVal });

	const formValues = watch();

	const stakeholder_type = formValues.stakeholder_type || oldStakeholderType;

	const config = possibleStakeholders[stakeholder_type];

	// fields.stakeholder_id.params = {
	// 	filters: { role_ids: agentIdMapping[stakeholder_type] || undefined },
	// };

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
		fields,
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
	};
};

export default useUpdateShipmentStakeholders;
