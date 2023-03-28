import Layout from '@cogo/business-modules/form/Layout';
import { forwardRef } from 'react';

import { Container } from './styles';
import useCargoDetails from './useCargoDetails';

function CargoDetails(props, ref) {
	const { controls, formProps } = useCargoDetails(props, ref);

	const {
		fields,
		formState: { errors },
	} = formProps;

	const showElements = { container_load_type: false };

	return (
		<Container>
			<Layout
				controls={controls}
				fields={fields}
				errors={errors}
				showElements={showElements}
			/>
		</Container>
	);
}

export default forwardRef(CargoDetails);
