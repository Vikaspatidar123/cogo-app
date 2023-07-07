import { Chips, DateRangepicker, CreatableSelect } from '@cogoport/components';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import { getFilterOption } from '../filterOptions';
import styles from '../styles.module.css';

const PAGE_ARR = ['page', 'pageLimit'];

const getOption = ({ t }) => [
	{
		children: (
			<div className={styles.import_export}>
				<div className={styles.type_label}>{t('orderHistory:filter_option_direct_pay')}</div>
			</div>
		),
		key: 'PAYMENT',
	},
	{
		children: (
			<div className={styles.import_export}>
				<div className={styles.type_label}>{t('orderHistory:filter_option_quota')}</div>
			</div>
		),
		key: 'QUOTA',
	},
];

const calculateLength = ({ filters }) => {
	let item = 0;
	Object.keys(filters)
		.filter((x) => !PAGE_ARR.includes(x))
		.forEach((ele) => {
			if (filters[ele]) {
				item += 1;
			}
		});
	return item;
};

function FilterContent({ filters = {}, setFilters = () => {} }) {
	const { t } = useTranslation(['orderHistory']);

	const options = getOption({ t });
	const selectOption = getFilterOption({ t });

	const filterLength = Object.keys(filters)?.filter(
		(x) => !PAGE_ARR.includes(x),
	)?.length;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>
					<div className={styles.title}>{t('orderHistory:filter_title')}</div>
					{(filterLength > 0 || filters?.requestType) && (
						<div className={styles.sub_header}>
							{`${t('orderHistory:filter_selected')} (${calculateLength({ filters })})`}
						</div>
					)}
				</div>
				{(filterLength > 0 || filters?.requestType) && (
					<div
						className={styles.clear_Btn}
						role="presentation"
						onClick={() => {
							setFilters({
								page      : 1,
								pageLimit : 10,
							});
						}}
					>
						<p>{t('orderHistory:filter_clear')}</p>
						<IcMCrossInCircle />
					</div>
				)}
			</div>
			<div className={styles.section2}>
				<div className={styles.section}>
					<CreatableSelect
						size="sm"
						placeholder={t('orderHistory:filter_select_placeholder')}
						value={filters?.requestType}
						options={selectOption || []}
						onChange={(e) => setFilters((prev) => ({
							...prev,
							requestType : e,
							page        : 1,
						}))}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>{t('orderHistory:filter_chips_label')}</div>
					<div className={styles.chips_container}>
						<Chips
							selectedItems={filters.paymentType}
							items={options}
							onItemChange={(e) => setFilters((prev) => ({
								...prev,
								paymentType: e,
							}))}
						/>
					</div>
				</div>
				<div className={styles.section}>
					<div className={styles.row}>
						<div className={styles.section}>
							<div className={styles.title}>{t('orderHistory:filter_date_label')}</div>
							<DateRangepicker
								pickerType="range"
								name="date"
								value={filters.date_range}
								isPreviousDaysAllowed
								maxDate={new Date()}
								onChange={(e) => setFilters((prev) => ({
									...prev,
									date_range : e,
									page       : 1,
								}))}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}

export default FilterContent;
