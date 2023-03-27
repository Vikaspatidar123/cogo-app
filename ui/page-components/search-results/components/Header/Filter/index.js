import FilterContent from '@cogo/business-modules/components/filters';
import useGetFilters from '@cogo/business-modules/hooks/useGetFilters';
import { useEffect, useState } from 'react';
import { Button } from '@cogoport/front/components/admin';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/front/utils';
import { Container, FilterDot } from './styles';
import controls from './controls';

const Filter = ({ setFilters, state, isMobile }) => {
	const [openFilter, setOpenFilter] = useState(false);

	const { shippingLineOptions, priceRange, response, rates = [] } = state;

	const freightCurrency = isEmpty(rates)
		? 'USD'
		: rates[0]?.freight_price_currency || 'USD';

	const final_controls = controls({ freightCurrency });

	const filterProps = useGetFilters({ controls: final_controls });

	const {
		fields,
		applyFilters,
		filters,
		reset: resetFilters,
	} = filterProps || {};

	useEffect(() => {
		setFilters(filters);
	}, [filters, response]);

	const handleReset = () => {
		resetFilters();
		setOpenFilter(false);
		setFilters();
	};

	const newFields = { ...fields };

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

	Object.keys(fields).forEach((control) => {
		if (control === 'shipping_line_id') {
			newFields[control].options = uniqueLineOption;
		}
		if (control === 'price_range') {
			newFields[control].min = priceRange?.min;
			newFields[control].max = priceRange?.max;
		}
	});

	return (
		<Container className={`${isMobile ? 'mobile-view' : 'web-view'}`}>
			<FilterContent
				fields={newFields}
				applyFilters={applyFilters}
				reset={handleReset}
				controls={final_controls}
				setOpen={setOpenFilter}
				open={openFilter}
				isScrollable
			>
				<Button
					className="secondary md"
					onClick={() => setOpenFilter(!openFilter)}
				>
					{!isMobile ? 'FILTERS' : ''} <IcMFilter />
					{filtersApplied > 0 && <FilterDot />}
				</Button>
			</FilterContent>
		</Container>
	);
};

export default Filter;
