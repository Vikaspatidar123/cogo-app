import React from 'react';

import Services from './Services';

function RFQView({
	mode = '',
	location = {},
	fields = {},
	advancedControls = [],
	optionsFields = {},
	services = {},
	setServices = () => {},
	showElements = {},
	formValues = {},
	errors = {},
	search_type = '',
}) {
	const incoKey = Object.keys(formValues).find((key) => key.includes('inco_term'));

	return (
		<Services
			mode={mode}
			incoTerm={formValues?.[incoKey]}
			services={services}
			setServices={setServices}
			location={location}
			advancedControls={advancedControls}
			optionsFields={optionsFields}
			fields={fields}
			showElements={showElements}
			formValues={formValues}
			errors={errors}
			search_type={search_type}
		/>

	);
}

export default RFQView;
