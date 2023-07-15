import { Select, DateRangepicker, Popover } from '@cogoport/components';
import { IcCFcrossInCircle, IcMArrowDown, IcMArrowUp, IcMFilter } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { getCommodityOptionMapping } from '../../common/commodity-mappings';

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
	setShippingLine,
}) {
	const { t } = useTranslation(['frt']);
	const [dropDown, setDropDown] = useState(false);
	const now = new Date();

	const COMMODITY_OPTIONS_MAPPING = getCommodityOptionMapping({ t });

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
	};

	const content = (
		<div className={styles.filter_item}>
			<div className={styles.container1}>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>{t('frt:filter_container_size')}</div>
					<Select
						placeholder="Size"
						value={containerSize}
						onChange={setContainerSize}
						options={filterControls.find((x) => x.name === 'container-size').options}
						style={{ width: '150px' }}
					/>
				</div>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>{t('frt:filter_container_type')}</div>
					<Select
						placeholder="type"
						value={containerType}
						onChange={setContainerType}
						options={filterControls.find((x) => x.name === 'container_type').options}
						style={{ width: '150px' }}
					/>
				</div>
			</div>
			<div className={styles.container1}>
				<div className={styles.select_div}>
					<div className={styles.input_title_text} />
					{t('frt:filter_commodity')}
					<Select
						placeholder="commodity"
						value={commodity}
						onChange={setCommodity}
						options={COMMODITY_OPTIONS_MAPPING[containerType]}
						style={{ width: '150px' }}
					/>
				</div>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>{t('frt:filter_currency')}</div>
					<Select
						placeholder="USD"
						value={filteredCurrency}
						onChange={setFilteredCurrency}
						options={filterControls.find((x) => x.name === 'currency').options}
						style={{ width: '150px' }}
					/>
				</div>
			</div>
			<div className={styles.container1}>
				<div className={styles.select_date}>
					<div className={styles.input_title_text}>{t('frt:filter_data_range')}</div>
					<DateRangepicker
						style={{ marginRight: '10px' }}
						value={dateRangePickerValue || new Date(now.setMonth(now.getMonth() - 6))}
						onChange={setDateRangePickerValue}
						isPreviousDaysAllowed
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
				<div role="presentation" className={styles.Clear_button_text} onClick={handleClear}>
					{t('frt:filter_clear_all')}
				</div>
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
						<div className={styles.filter_text}>{t('frt:filter')}</div>
					</div>
					<div className={styles.direction_icon}>{dropDown ? <IcMArrowUp /> : <IcMArrowDown />}</div>
				</div>
			</Popover>
		</div>
	);
}
export default FilterForm;
