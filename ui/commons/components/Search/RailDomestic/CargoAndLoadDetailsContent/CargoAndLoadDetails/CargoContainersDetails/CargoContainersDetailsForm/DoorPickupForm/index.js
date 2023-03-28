import Layout from '@cogo/business-modules/form/Layout';
import { forwardRef } from 'react';

import useDoorPickupForm from './useDoorPickupForm';

function DoorPickupForm(props, ref) {
	const { controls, formProps, showFields } = useDoorPickupForm(props, ref);

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

export default forwardRef(DoorPickupForm);
