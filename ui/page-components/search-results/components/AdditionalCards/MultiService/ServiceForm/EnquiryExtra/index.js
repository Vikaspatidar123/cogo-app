import React, { forwardRef } from 'react';
import Layout from '@cogo/business-modules/form/Layout';

import useUpdateEnquiryParams from '../../../../../hooks/useUpdateEnquiryParams';

const EnquiryExtraControls = (
	{
		service,
		detail,
		location,
		onClose,
		handleServiceAdd,
		refetch = () => {},
		setExtraDetails,
		extraDetails,
		prefillDetails,
		extraData,
		setShowElementExtra,
		serviceKey,
		params,
		index,
	},
	ref,
) => {
	const { controls, fields, errors, showElements } = useUpdateEnquiryParams({
		service,
		location,
		handleServiceAdd,
		onClose,
		detail,
		refetch,
		ref,
		setExtraDetails,
		extraDetails,
		prefillDetails,
		extraData,
		setShowElementExtra,
		serviceKey,
		params,
		index,
	});

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

export default forwardRef(EnquiryExtraControls);
