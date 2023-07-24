import { getByKey } from '@cogoport/utils';

import getCountryDetails from '../../utils/getCountryDetails';
import CN from '../geo/CN';
import defaultInfo from '../geo/default';
import ID from '../geo/ID';
import IN from '../geo/IN';
import SG from '../geo/SG';
import TH from '../geo/TH';
import VN from '../geo/VN';

const COUNTRY_SPECIFIC_DATA = {
	IN      : IN.others,
	VN      : VN.others,
	CN      : CN.others,
	SG      : SG.others,
	TH      : TH.others,
	ID      : ID.others,
	default : defaultInfo,
};

const getCountrySpecificData = ({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData = true,
	country_code = '',
}) => {
	const countryDetails = getCountryDetails({
		country_id, country_code,
	}) || {};

	const countryCode = countryDetails.country_code;

	const data = COUNTRY_SPECIFIC_DATA?.[countryCode] || (isDefaultData ? COUNTRY_SPECIFIC_DATA.default : {});

	return getByKey(data[accessorType], accessor) || null;
};

function CountrySpecificData({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData,
}) {
	return (
		<>
			{getCountrySpecificData({
				country_id,
				accessor,
				accessorType,
				isDefaultData,
			})}
		</>
	);
}

export { getCountrySpecificData, CountrySpecificData };
