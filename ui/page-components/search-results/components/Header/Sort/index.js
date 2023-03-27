import React from 'react';
import Select from '@cogo/business-modules/form/components/Business/Select';
import { usePartnerEntityType, useScope } from '@cogo/commons/hooks';
import getConfig from '@cogo/app-search/hooks/configuration';
import { APP_EVENT, trackEvent } from '@cogo/commons/analytics';
import SELECT_CUSTOM_THEME from '../select-custom-theme';

const Sort = ({ sortBy = '', search_type = '', setSort = () => {} }) => {
	const { isChannelPartner = false } = usePartnerEntityType();
	const { scope } = useScope();
	const sortList = getConfig('sort', search_type, isChannelPartner);

	if ((sortList || []).length < 2) {
		return null;
	}

	const controls = {
		name: 'sort_by',
		type: 'select',
		value: sortBy,
		caret: true,
		placeholder: 'Sort By',
		options: sortList,
	};

	const handleChange = (val) => {
		if (scope === 'app')
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
};

export default Sort;
