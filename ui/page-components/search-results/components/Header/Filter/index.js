import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetFilters from '../../../hooks/useGetFilters';

import controls from './controls';
import FilterContent from './filters';
import styles from './styles.module.css';

function Filter({ setFilters, state, isMobile }) {
	const [openFilter, setOpenFilter] = useState(false);

	const { shippingLineOptions, priceRange, response, rates = [] } = state;

	const freightCurrency = isEmpty(rates)
		? 'USD'
		: rates[0]?.freight_price_currency || 'USD';

	const final_controls = controls({ freightCurrency });

	const filterProps = useGetFilters({ controls: final_controls });

	const {
		applyFilters,
		filters,
		reset: resetFilters,
		control,
	} = filterProps || {};

	useEffect(() => {
		setFilters(filters);
	}, [filters, response]);

	const handleReset = () => {
		resetFilters();
		setOpenFilter(false);
		setFilters();
	};

	const newFields = final_controls;

	const filtersApplied = Object.keys(filters).length;

	const uniqueLineOption = [];
	shippingLineOptions.forEach((shippingLineOption) => {
		let flag = false;

		for (
			let uniqueOption = 0;
			uniqueOption < uniqueLineOption.length;
			uniqueOption += 1
		) {
			if (shippingLineOption?.value === uniqueLineOption[uniqueOption]?.value) {
				flag = true;
				break;
			}
		}
		if (!flag) uniqueLineOption.push(shippingLineOption);
	});

	newFields.forEach((item, index) => {
		if (item.name === 'shipping_line_id') {
			newFields[index].options = uniqueLineOption;
		}
		if (item.name === 'price_range') {
			newFields[index].min = priceRange?.min;
			newFields[index].max = priceRange?.max;
		}
	});

	return (
		<div>
			<FilterContent
				fields={newFields}
				applyFilters={applyFilters}
				reset={handleReset}
				controls={final_controls}
				setOpen={setOpenFilter}
				open={openFilter}
				isScrollable
				control={control}
			>
				<Button onClick={() => setOpenFilter(!openFilter)} themeType="secondary">
					{!isMobile ? 'FILTERS' : ''}
					{' '}
					<IcMFilter />
					{filtersApplied > 0 && <div className={styles.filter_dot} />}
				</Button>
			</FilterContent>
		</div>
	);
}

export default Filter;
