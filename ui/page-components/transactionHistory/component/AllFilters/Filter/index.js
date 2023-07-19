import { DateRangepicker, CreatableSelect, Button, Popover, Chips } from '@cogoport/components';
import { IcMFilter, IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { getBillTypeOptions, getPaymentTypeOption } from './filterOptions';
import styles from './styles.module.css';

function FilterContent({ filters, setFilters }) {
	const { t } = useTranslation(['transactionHistory']);
	const BILL_TYPE_OPTIONS = getBillTypeOptions({ t });
	const PAYMENT_TYPE_OPTIONS = getPaymentTypeOption({ t });
	const [dateRangePickerValue, setDateRangePickerValue] = useState({});

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div className={styles.title}>{t('transactionHistory:filter_apply')}</div>
				{!isEmpty(filters) && (
					<div
						className={styles.clear_Btn}
						role="presentation"
						onClick={() => {
							setFilters({
								page      : 1,
								pageLimit : 10,
							});
							setDateRangePickerValue({});
						}}
					>
						<p>{t('transactionHistory:filter_clear')}</p>
						<IcMCrossInCircle />
					</div>
				)}
			</div>

			<div className={styles.container_section}>
				<div className={styles.section}>
					<div className={styles.title}>{t('transactionHistory:filter_bill_type')}</div>
					<CreatableSelect
						type="select"
						placeholder={t('transactionHistory:filter_bill_type_placeholder')}
						value={filters.bill_type}
						options={BILL_TYPE_OPTIONS}
						onChange={(e) => setFilters((prev) => ({
							...prev,
							bill_type: e,
						}))}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>{t('transactionHistory:filter_status')}</div>
					<div className={styles.chips_container}>
						<Chips
							selectedItems={filters.payment_status}
							items={PAYMENT_TYPE_OPTIONS}
							onItemChange={(e) => setFilters((prev) => ({
								...prev,
								payment_status: e,
							}))}
						/>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>{t('transactionHistory:filter_date_range')}</div>
					<DateRangepicker
						value={dateRangePickerValue}
						pickerType="range"
						name="date"
						onChange={(e) => {
							setDateRangePickerValue(e);
							setFilters((prev) => ({
								...prev,
								...e,
							}));
						}}
					/>
				</div>
			</div>
		</div>
	);
}

function FilterSection({ filters, setFilters }) {
	const { t } = useTranslation(['transactionHistory']);

	const [showFilters, setshowFilters] = useState(false);
	return (
		<Popover
			maxWidth={450}
			theme="light"
			interactive={showFilters}
			visible={showFilters}
			onClickOutside={() => setshowFilters(false)}
			content={
				<FilterContent filters={filters} setFilters={setFilters} />
			}
		>
			<Button onClick={() => setshowFilters(!showFilters)}>
				{t('transactionHistory:filter_title')}
				<IcMFilter height={15} width={14} />
			</Button>
		</Popover>
	);
}

export default FilterSection;
