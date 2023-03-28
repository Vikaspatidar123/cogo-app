import Layout from '@cogo/business-modules/form/Layout';
import { forwardRef } from 'react';

import useDoorstepDeliveryForm from './useDoorstepDeliveryForm';

function DoorstepDeliveryForm(props, ref) {
	const { controls, formProps, showFields } = useDoorstepDeliveryForm(
		props,
		ref,
	);

	const {
		fields,
		formState: { errors },
	} = formProps;

	return (
		<Layout
			controls={controls}
			fields={fields}
			errors={errors}
			showElements={showFields}
		/>
	);
}

export default forwardRef(DoorstepDeliveryForm);
