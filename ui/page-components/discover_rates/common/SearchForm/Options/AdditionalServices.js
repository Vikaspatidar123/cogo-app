import React from 'react';

import AdvancedOptions from './AdvancedOptions';
import RfqAdditionalService from './RfqAdditionalServices';

function AdditionalServices({ search_type, ...rest }) {
	if (search_type === 'rfq') {
		return <RfqAdditionalService {...rest} search_type={search_type} />;
	}
	return <AdvancedOptions {...rest} />;
}

export default AdditionalServices;
