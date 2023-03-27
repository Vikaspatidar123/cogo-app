import React from 'react';
import Layout from '@cogo/business-modules/form/Layout';
import { forwardRef } from '@cogo/deprecated_legacy/hooks';
import useAddService from '../../../../../hooks/useAddService';

const ServiceForm = (
	{
		service,
		detail = {},
		onClose = () => {},
		refetch = () => {},
		setNoOfServiceForms = () => {},
		addedServiceEnquiry,
		formData,
		prefillDetails,
		setShowElementAdd,
		setLocationObj,
		setParams,
		params,
	},
	ref,
) => {
	const { search_type } = detail || {};
	const { controls, showElements, errors, formProps } = useAddService({
		detail,
		service,
		search_type,
		services: Object.values(detail?.service_details || {}),
		onAdd: () => {
			refetch();
			onClose();
		},
		setNoOfServiceForms,
		addedServiceEnquiry,
		formData,
		prefillDetails,
		setShowElementAdd,
		setLocationObj,
		setParams,
		params,
		ref,
	});

	const { fields } = formProps || {};

	return (
		<>
			<Layout
				controls={controls}
				fields={fields}
				errors={errors}
				showElements={showElements}
			/>
		</>
	);
};

export default forwardRef(ServiceForm);
