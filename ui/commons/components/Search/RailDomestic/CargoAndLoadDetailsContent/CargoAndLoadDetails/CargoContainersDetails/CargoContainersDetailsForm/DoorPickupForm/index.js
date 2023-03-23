import { forwardRef } from 'react';
import Layout from '@cogo/business-modules/form/Layout';
import useDoorPickupForm from './useDoorPickupForm';

const DoorPickupForm = (props, ref) => {
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
};

export default forwardRef(DoorPickupForm);
