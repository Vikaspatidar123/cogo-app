import { Select, DateRangepicker, Popover, Button, cl } from '@cogoport/components';
import { IcCFcrossInCircle, IcMArrowUp, IcMFilter } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { getCommodityOptionMapping } from '../../common/commodity-mappings';
import { DEFAULT_FILTERS } from '../../constants';

import filterControls from './filter-controls';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function FilterForm({
	setFilters,
	filters,
}) {
	const { t } = useTranslation(['frt']);
	const { profile } = useSelector((state) => state);

	const { organization } = profile || {};

	const { country } = organization || {};
	const [dropDown, setDropDown] = useState(false);
	const now = new Date();

	const COMMODITY_OPTIONS_MAPPING = getCommodityOptionMapping({ t });

	const handleClear = () => {
		setFilters(DEFAULT_FILTERS({ country }));
	};
	const setValue = ({ key, value }) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};
	const content = (
		<div className={styles.filter_item}>
			<div className={styles.container1}>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>{t('frt:filter_container_size')}</div>
					<Select
						placeholder="Size"
						value={filters.containerSize}
						onChange={(value) => setValue({ value, key: 'containerSize' })}
						options={filterControls.find((x) => x.name === 'container-size').options}
						style={{ width: '150px' }}
					/>
				</div>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>{t('frt:filter_container_type')}</div>
					<Select
						placeholder="type"
						value={filters.containerType}
						onChange={(value) => setFilters((prev) => ({
							...prev,
							containerType : value,
							commodities   : COMMODITY_OPTIONS_MAPPING[value]?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
						}))}
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
						value={filters.commodities}
						onChange={(value) => setValue({ value, key: 'commodities' })}
						options={COMMODITY_OPTIONS_MAPPING[filters.containerType]}
						style={{ width: '150px' }}
					/>
				</div>
				<div className={styles.select_div}>
					<div className={styles.input_title_text}>{t('frt:filter_currency')}</div>
					<Select
						value={filters.filteredCurrency}
						onChange={(value) => setValue({ value, key: 'filteredCurrency' })}
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
						value={{
							startDate : filters.validity_start,
							endDate   : filters.validity_end,
						} || new Date(now.setMonth(now.getMonth() - 6))}
						onChange={(value) => setFilters((prev) => ({
							...prev,
							validity_start : value.startDate,
							validity_end   : value.endDate,
						}))}
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
				caret={false}
				content={content}
				interactive
				visible={dropDown}
				onClickOutside={() => setDropDown(false)}
			>
				<Button
					themeType="secondary"
					type="button"
					onClick={() => {
						setDropDown((prev) => !prev);
					}}
				>
					<IcMFilter className={styles.filter_icon} />
					{t('frt:filter')}
					<div className={cl`${styles.icon} ${dropDown ? styles.rotate : ''}`}>
						<IcMArrowUp />
					</div>
				</Button>
			</Popover>
		</div>

	);
}
export default FilterForm;
