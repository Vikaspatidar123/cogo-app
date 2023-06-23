import getConfiguration from '../configurations/SearchFormControls/getConfiguration';

import setDefaultValues from './setDefaultValues';

const getControls = ({
	mode,
	additionalServiceValues: data,
	mobile = false,
	location = {},
	isChannelPartner = false,
}) => {
	const advancedControls = getConfiguration(
		'advanced-controls',
		mode,
		isChannelPartner,
	);

	const withValueAdvancedControls = setDefaultValues(
		advancedControls,
		data,
		mobile,
		location,
	);

	return {
		advancedControls: withValueAdvancedControls,
	};
};

export default getControls;
