import {
	Modal, DateRangepicker, Button, Select,
} from '@cogoport/components';
import { IcCFcrossInCircle } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import { COMMODITY_OPTIONS_MAPPING } from '../../common/commodity-mappings';

import filterControls from './filter-controls';
import styles from './filter-styles.module.css';

import { SelectController } from '@/packages/forms';

function FilterModal({
	handleFilterModal,
	isOpen,
	heading,
	refetch,
	commodity,
	setCommodity,
	dateRangePickerValue,
	setDateRangePickerValue,
	filteredCurrency,
	setFilteredCurrency,
	containerSize,
	setContainerSize,
	containerType,
	setContainerType,
	shippingLine,
	setShippingLine,
}) {
	useEffect(() => {
		if (
			commodity
			|| filteredCurrency
			|| dateRangePickerValue.startDate
			|| dateRangePickerValue.endDate
		) {
			// updateFilters();
		}
	}, [commodity, dateRangePickerValue, filteredCurrency]);

	const now = new Date();
	const handleClear = () => {
		setCommodity('');
		setDateRangePickerValue({
			startDate : new Date(now.setMonth(now.getMonth() - 6)),
			endDate   : new Date(new Date().setMonth(new Date().getMonth() + 1)),
		});
		setFilteredCurrency('');
		setContainerSize('');
		setContainerType('');
		setShippingLine('');
		refetch();
	};

	const newFiled = {
		name           : 'id',
		label          : 'short_name',
		type           : 'select',
		optionsListKey : 'shipping-lines',
		placeholder    : 'Search via name',
		validations    : [{ type: 'required', message: 'Required' }],
	};

	return (
		<Modal heading={heading} onClose={handleFilterModal} isOpen={isOpen}>
			<div className={styles.Filter_item}>
				<Select
					placeholder="Container Size"
					value={containerSize}
					onChange={setContainerSize}
					options={filterControls[0].options}
				/>
				<Select
					placeholder="type"
					value={containerType}
					onChange={setContainerType}
					options={filterControls[1].options}
				/>
				<Select
					placeholder="commodity"
					value={commodity}
					onChange={setCommodity}
					options={COMMODITY_OPTIONS_MAPPING[containerType]}
				/>
				<div className={styles.select_div}>
					<SelectController
						{...newFiled}
						value={shippingLine}
						onChange={setShippingLine}
					/>
				</div>
				<DateRangepicker
					style={{ marginRight: '10px' }}
					value={dateRangePickerValue || new Date()}
					onChange={setDateRangePickerValue}
				/>
				<Select
					placeholder="USD"
					value={filteredCurrency}
					onChange={setFilteredCurrency}
					options={filterControls[4].options}
				/>
			</div>
			<div className={styles.button_group}>
				<div
					role="presentation"
					className={styles.clear_button}
					style={{ marginLeft: '10px' }}
					onClick={handleClear}
				>
					<IcCFcrossInCircle size={1.2} fill="#f75620" />
					<div className={styles.clear_button_text}>CLEAR ALL</div>
				</div>
				<Button size="lg" variant="secondary" onClick={handleFilterModal}>
					Done
				</Button>
			</div>
		</Modal>
	);
}

export default FilterModal;
