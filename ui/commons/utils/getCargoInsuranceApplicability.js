import { isEmpty } from '@cogoport/utils';

import { getCountryCode } from './getCountryDetails';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const isCargoInsuranceApplicable = ({ country_id }) => {
	const country_code = getCountryCode({ country_id });

	let is_cargo_insurance_applicable = false;

	if (country_code in GLOBAL_CONSTANTS.cargo_insurance) {
		is_cargo_insurance_applicable = !isEmpty(
			GLOBAL_CONSTANTS.cargo_insurance[country_code],
		);
	}

	return is_cargo_insurance_applicable;
};

export default isCargoInsuranceApplicable;
