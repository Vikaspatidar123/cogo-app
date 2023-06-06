import { Select } from '@cogoport/components';
import React, { useState } from 'react';

import Filter from './Filter';
import Sort from './Sort';
import styles from './styles.module.css';

import Slider from '@/packages/forms/Business/Slider';

function Header({
	search_type = '',
	setSort = () => {},
	sortBy = '',
	setFilters,
	state = {},
	rates_count = 0,
}) {
	const { shippingLineOptions, priceRange, rates } = state;
	const { max, min } = priceRange;
	const [rateSliderValue, setRateSliderValue] = useState(max + 100);
	const [selectShippingLineValue, setSelectShippingLineValue] = useState('');
	const uniqueShippingLineOption = shippingLineOptions.reduce((pv, cv) => {
		const optionExists = pv.some(
			(existingOption) => existingOption.value === cv.value,
		);
		return optionExists ? pv : [...pv, cv];
	}, []);
	const functionSelect = () => (
		<div className={styles.select_component}>
			<Select
				options={uniqueShippingLineOption}
				placeholder="Shipping Line"
				value={selectShippingLineValue}
				isClearable
				style={{ width: '126px' }}
				onChange={(val) => {
					setSelectShippingLineValue(val);
					setFilters({
						shipping_line_id: val,
					});
				}}
			/>
		</div>
	);
	const functionSlider = () => (
		<div className={styles.slider_component}>
			<div className={styles.slider_wrapper}>
				<Slider
					value={rateSliderValue}
					min={min}
					max={max + 100}
					suffixtext="(BAS)"
					unit={[rates?.[0]?.freight_price_currency]}
					onChange={(e) => {
						const roundedValue = parseFloat(e.target.value).toFixed(2);
						setRateSliderValue(roundedValue);
						setFilters({
							price_range: e.target.value,
						});
					}}
				/>
			</div>
		</div>
	);

	return (
		<div className={styles.main}>
			<div className={styles.section}>
				{search_type === 'fcl_freight' && rates_count ? (
					<>
						{max && min ? functionSlider() : null}
						{ functionSelect()}
						<Filter setFilters={setFilters} state={state} />
					</>
				) : null}
				{rates_count ? (
					<div className={styles.freight_rate_search}>
						<Sort
							search_type={search_type}
							setSort={setSort}
							sortBy={sortBy}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Header;
