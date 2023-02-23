import { Select, DateRangepicker, Popover } from '@cogoport/components';
import {
	IcCFcrossInCircle, IcMArrowDown, IcMArrowUp, IcMFilter,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import { COMMODITY_OPTIONS_MAPPING } from '../../common/commodity-mappings';

import filterControls from './filter-controls';
import styles from './styles.module.css';

function FilterForm({
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
	refetch,
}) {
	const [dropDown, setDropDown] = useState(false);
	const now = new Date();
	const handleClear = () => {
		setCommodity('');
		setDateRangePickerValue({
			startDate : new Date(now.setMonth(now.getMonth() - 6)),
			endDate   : new Date(new Date().setMonth(new Date().getMonth() + 1)),
		});
		setFilteredCurrency();
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
		placeholder    : 'shipping line',
		validations    : [{ type: 'required', message: 'Required' }],
	};
	const content = (
		<div className={styles.filter_item}>
			<div className={styles.container1}>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>Container Size</div>
					<Select
						placeholder="Size"
						value={containerSize}
						onChange={setContainerSize}
						options={filterControls[0].options}
					/>
				</div>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>Container type</div>
					<Select
						placeholder="type"
						value={containerType}
						onChange={setContainerType}
						options={filterControls[1].options}
					/>
				</div>
			</div>
			<div className={styles.container1}>
				<div className={styles.select_div}>
					<div className={styles.input_title_text} />
					Commodity
					<Select
						placeholder="commodity"
						value={commodity}
						onChange={setCommodity}
						options={COMMODITY_OPTIONS_MAPPING[containerType]}
					/>
				</div>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>Shipping line</div>
					<Select
						{...newFiled}
						value={shippingLine}
						onChange={setShippingLine}
					/>
				</div>
			</div>
			<div className={styles.container1}>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>Date Range</div>
					<DateRangepicker
						style={{ marginRight: '10px' }}
						value={dateRangePickerValue || new Date(now.setMonth(now.getMonth() - 6))}
						onChange={setDateRangePickerValue}
					/>
				</div>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>Currency</div>
					<Select
						placeholder="USD"
						value={filteredCurrency}
						onChange={setFilteredCurrency}
						options={filterControls[4].options}
					/>
				</div>
			</div>
			<div className={styles.clear_button}>
				<IcCFcrossInCircle
					style={{ cursor: 'pointer' }}
					onClick={handleClear}
					size={2}
					fill="#f75620"
				/>
				<div role="presentation" className={styles.Clear_button_text} onClick={handleClear}>CLEAR ALL</div>
			</div>
		</div>

	);
	return (
		<div className={styles.container}>
			<Popover
				theme="light"
				caret={false}
				placement="bottom-start"
				animation="shift-away"
				content={content}
				interactive
				visible={dropDown}
				onClickOutside={() => setDropDown(false)}
			>
				<div
					role="presentation"
					className={styles.filter_button_Ctn}
					onClick={() => {
						setDropDown(!dropDown);
					}}
				>
					<div style={{ display: 'flex' }}>
						<div className={styles.filter_icon}>
							<IcMFilter />
						</div>
						<div className={styles.filter_text}>Filter</div>
					</div>
					<div className={styles.direction_icon}>{dropDown ? <IcMArrowUp /> : <IcMArrowDown />}</div>
				</div>
			</Popover>
		</div>
	);
}
export default FilterForm;
