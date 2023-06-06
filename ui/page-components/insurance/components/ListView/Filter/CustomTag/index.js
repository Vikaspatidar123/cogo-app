import { IcMCross } from '@cogoport/icons-react';

import styles from './styles.module.css';

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
				<div className={styles.tag}>
					<div className={styles.text}>
						{`${FILTERS[filterKey]} : ${filters[filterKey].replace('_', ' ')}`}
					</div>
					<IcMCross className="cross" onClick={() => crossHandler(filterKey)} />
				</div>
			);
		}
		if (filterKey === 'policyType' && filters?.policyType) {
			return (
				<div className={styles.tag}>
					<div className={styles.text}>
						{`${FILTERS[filterKey]} : ${filters[filterKey].replace('_', ' ')}`}
					</div>
					<IcMCross className="cross" onClick={() => crossHandler(filterKey)} />
				</div>
			);
		}
		if (filterKey === 'riskCoverage' && filters?.riskCoverage) {
			return (
				<div className={styles.tag}>
					<div className={styles.text}>
						{`${FILTERS[filterKey]} : ${filters[filterKey]}`}
					</div>
					<IcMCross className="cross" onClick={() => crossHandler(filterKey)} />
				</div>
			);
		}
		return null;
	};

	return <div className={styles.container}>{Object?.keys(filters).map((ele) => renderTag(ele))}</div>;
}

export default CustomTag;
