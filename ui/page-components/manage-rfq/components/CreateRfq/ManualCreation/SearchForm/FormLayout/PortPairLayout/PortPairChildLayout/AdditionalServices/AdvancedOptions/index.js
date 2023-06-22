import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import Services from './Services';

import getFormFields from '@/ui/page-components/manage-rfq/utils/getFormFields';
import mutateMainFields from '@/ui/page-components/manage-rfq/utils/mutate-fields';

function AdvancedOptions(props) {
	const {
		mode = '',
		location = {},
		advancedControls = [],
		services = {},
		setServices = () => {},
		formValues = {},
		errors = {},
		showElements,
		// formProps,
		control = {},
		handleIndex,
		expandServices,
		showServices = false,
		setExpandServices = () => {},
		handleServices = () => {},
	} = props;

	const incoKey = Object.keys(formValues).find((key) => key.includes('inco_term'));

	const fields = getFormFields(advancedControls);

	const mainFields = mutateMainFields({
		fields,
		mode,
		location,
		services : services?.[mode]?.[handleIndex] || {},
		data     : {},
	});

	useEffect(() => {
		if (isEmpty(services) && showServices) {
			handleServices();
		}
	}, [handleServices, services, showServices]);

	return (
		<Services
			mode={mode}
			incoTerm={formValues?.[incoKey]}
			services={services}
			setServices={setServices}
			location={location}
			advancedControls={advancedControls}
			fields={mainFields}
			control={control}
			showElements={showElements}
			formValues={formValues}
			errors={errors}
			handleIndex={handleIndex}
			setExpandServices={setExpandServices}
			expandServices={expandServices}
		/>
	);
}

export default AdvancedOptions;
