import { Select, DateRangepicker, Popover } from '@cogoport/components';
import { IcCFcrossInCircle, IcMArrowDown, IcMArrowUp, IcMFilter } from '@cogoport/icons-react';
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
		<div
			role="presentation"
			className={styles.container}
			onClick={() => {
				setDropDown(!dropDown);
			}}

		>
			<Popover
				caret={false}
				placement="bottom-start"
				animation="shift-away"
				content={content}
				interactive
				visible={dropDown}
				onClickOutside={() => setDropDown(false)}
			>
				<div
					className={styles.filter_button_ctn}

				>
					<div
						role="presentation"
						style={{ display: 'flex' }}
						onClick={() => {
							setDropDown(!dropDown);
						}}
					>
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
