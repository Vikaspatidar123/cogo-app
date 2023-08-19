import { getCookie } from '@cogoport/utils';

import CN from './CN';
import ID from './ID';
import IN from './IN';
import SG from './SG';
import TH from './TH';
import VN from './VN';

const mapping = { IN, VN, SG, TH, CN, ID };

const getUserLocationContent = async () => {
	let countryCode = 'IN';

	if (typeof document !== 'undefined') {
		countryCode = getCookie('location');
	}

	return mapping[countryCode in mapping ? countryCode : 'IN'];
};

export default getUserLocationContent;
