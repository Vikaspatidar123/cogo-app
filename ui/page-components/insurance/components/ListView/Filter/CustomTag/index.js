import { IcMCross } from '@cogoport/icons-react';

import { Container, Tag, Txt } from './style';

const FILTERS = {
	riskCoverage : 'Risk',
	policyType   : 'Type',
	status       : 'Status',
};

function CustomTag({ filters = {}, setFilters }) {
	const crossHandler = (filterKey, value = '') => {
		setFilters((prev) => ({
			...prev,
			[filterKey]: value,
		}));
	};

	const renderTag = (filterKey) => {
		if (filterKey === 'status' && filters?.status) {
			return (
				<Tag>
					<Txt>{`${FILTERS[filterKey]} : ${filters[filterKey].replace('_', ' ')}`}</Txt>
					<IcMCross className="cross" onClick={() => crossHandler(filterKey)} />
				</Tag>
			);
		}
		if (filterKey === 'policyType' && filters?.policyType) {
			return (
				<Tag>
					<Txt>{`${FILTERS[filterKey]} : ${filters[filterKey].replace('_', ' ')}`}</Txt>
					<IcMCross className="cross" onClick={() => crossHandler(filterKey)} />
				</Tag>
			);
		}
		if (filterKey === 'riskCoverage' && filters?.riskCoverage) {
			return (
				<Tag>
					<Txt>{`${FILTERS[filterKey]} : ${filters[filterKey]}`}</Txt>
					<IcMCross className="cross" onClick={() => crossHandler(filterKey)} />
				</Tag>
			);
		}
		return null;
	};

	return <Container>{Object?.keys(filters).map((ele) => renderTag(ele))}</Container>;
}

export default CustomTag;
