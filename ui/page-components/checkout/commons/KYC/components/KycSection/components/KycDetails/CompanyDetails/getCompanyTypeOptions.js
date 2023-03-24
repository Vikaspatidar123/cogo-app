import { getCountryId } from '@cogo/commons/utils/getCountryId';

const VIETNAM_COUNTRY_ID = getCountryId('VN');

const getCompanyTypeOptions = (country_id = '') => {
	if (country_id === VIETNAM_COUNTRY_ID) {
		return [
			{
				label : 'Limited Liability Company ( LLC )',
				value : 'limited_liability_company',
			},
			{ label: 'Joint-Stock Company ( JSC )', value: 'joint_stock_company' },
			{ label: 'Representative Office ( RO )', value: 'representative_office' },
			{ label: 'Branch ( B )', value: 'branch' },
		];
	}

	return [
		{ label: 'Private Limited', value: 'private_limited' },
		{ label: 'Public Limited', value: 'public_limited' },
		{ label: 'Partnership', value: 'partnership' },
		{
			label : 'Limited Liability Partnership',
			value : 'limited_liability_partnership',
		},
		{ label: 'Proprietorship', value: 'proprietorship' },
		{ label: 'Other', value: 'other' },
	];
};

export default getCompanyTypeOptions;
