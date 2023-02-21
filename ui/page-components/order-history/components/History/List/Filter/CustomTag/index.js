import { IcMCross } from '@cogoport/icons-react';

import sytles from './styles.module.css';

const FILTERS = {
	showExpired : 'Expired',
	expiresIn   : 'Expires In',
	status      : 'Status',
};

function CustomTag({
	filters = {},
	setFilters,
	setChecked = () => {},
	setExpireDay = () => {},
}) {
	const crossHandler = (filterKey, value = '') => {
		if (filterKey === 'expiresIn') {
			setExpireDay('');
		}
		if (filterKey === 'showExpired') {
			setChecked(false);
		}
		setFilters((prev) => ({
			...prev,
			[filterKey]: value,
		}));
	};

	const renderTag = (filterKey) => {
		if (filterKey === 'showExpired' && filters.showExpired) {
			return (
				<div className={sytles.tag}>
					<div className={sytles.txt}>{`${FILTERS[filterKey]} Quotation`}</div>
					<IcMCross className={sytles.cross} onClick={() => crossHandler(filterKey, false)} />
				</div>
			);
		}
		if (filterKey === 'status' && filters.status) {
			return (
				<div className={sytles.tag}>
					<div className={sytles.txt}>{`${FILTERS[filterKey]} : ${filters[filterKey]}`}</div>
					<IcMCross className={sytles.cross} onClick={() => crossHandler(filterKey)} />
				</div>
			);
		}
		if (filterKey === 'expiresIn' && filters.expiresIn) {
			return (
				<div className={sytles.tag}>
					<div className={sytles.txt}>{`${FILTERS[filterKey]} ${filters[filterKey]} days`}</div>
					<IcMCross className={sytles.cross} onClick={() => crossHandler(filterKey)} />
				</div>
			);
		}
		if (filterKey === 'date_range' && filters.date_range) {
			return (
				<div className={sytles.tag}>
					{/* <div className={sytles.txt}>
						{`${(
							filters[filterKey]?.startDate,
							'dd/MM/yyy',
						)} - ${format(filters[filterKey]?.endDate, 'dd/MM/yyy')}`}
					</div> */}
					<IcMCross className={sytles.cross} onClick={() => crossHandler(filterKey)} />
				</div>
			);
		}
		return null;
	};

	return (
		<div className={sytles.container}>{Object?.keys(filters).map((ele) => renderTag(ele))}</div>
	);
}

export default CustomTag;
