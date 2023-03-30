import { Select } from '@cogoport/components';
import getConfig from 'next/config';

import SELECT_CUSTOM_THEME from '../select-custom-theme';

import usePartnerEntityType from '@/packages/forms/hooks/usePartnerEntityType';
import { APP_EVENT, trackEvent } from '@/ui/page-components/discover_rates/common/analytics';

function Sort({ sortBy = '', search_type = '', setSort = () => {} }) {
	const { isChannelPartner = false } = usePartnerEntityType();
	const sortList = getConfig('sort', search_type, isChannelPartner);

	if ((sortList || []).length < 2) {
		return null;
	}

	const controls = {
		name        : 'sort_by',
		type        : 'select',
		value       : sortBy,
		caret       : true,
		placeholder : 'Sort By',
		options     : sortList,
	};

	const handleChange = (val) => {
		for (let i = 0; i < sortList.length; i += 1) {
			if (sortList[i].value === val) {
				trackEvent(APP_EVENT.search_sorted_search_results, {
					type: sortList[i].label,
				});
			}
		}

		setSort(val);
	};

	return (
		<Select
			{...controls}
			onChange={handleChange}
			style={SELECT_CUSTOM_THEME('sort')}
		/>
	);
}

export default Sort;
