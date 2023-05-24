import { Select } from '@cogoport/components';

import styles from './styles.module.css';

import usePartnerEntityType from '@/packages/forms/hooks/usePartnerEntityType';
import {
	APP_EVENT,
	trackEvent,
} from '@/ui/page-components/discover_rates/common/analytics';
import getConfiguration from '@/ui/page-components/discover_rates/hooks/configurations';

function Sort({ sortBy = '', search_type = '', setSort = () => {} }) {
	const { isChannelPartner = false } = usePartnerEntityType();
	const sortList = getConfiguration('sort', search_type, isChannelPartner);

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
			className={styles.card_select}
		/>
	);
}

export default Sort;
