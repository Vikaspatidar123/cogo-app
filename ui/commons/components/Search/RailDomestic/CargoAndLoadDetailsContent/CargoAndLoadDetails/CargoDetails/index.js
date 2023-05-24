import { forwardRef } from 'react';

import { Container } from './styles';
import useCargoDetails from './useCargoDetails';

import FormElement from '@/ui/page-components/discover_rates/common/FormElement';

function CargoDetails(props, ref) {
	const { controls, formProps } = useCargoDetails(props, ref);

	const {
		fields,
		formState: { errors },
	} = formProps;

	const showElements = { container_load_type: false };

	return (
		<Container>
			<FormElement
				controls={controls}
				fields={fields}
				errors={errors}
				showElements={showElements}
			/>
		</Container>
	);
}

export default forwardRef(CargoDetails);
