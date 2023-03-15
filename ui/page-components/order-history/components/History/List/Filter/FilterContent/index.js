import { Chips, DateRangepicker, CreatableSelect } from '@cogoport/components';
import { IcMCrossInCircle } from '@cogoport/icons-react';

import { options } from '../filterOptions';
import styles from '../styles.module.css';

function FilterContent({ filters = {}, setFilters = () => {} }) {
	const filterLength = Object.keys(filters)?.filter(
		(x) => !['page', 'pageLimit'].includes(x),
	)?.length;

	const calculateLength = () => {
		let item = 0;
		Object.keys(filters)
			.filter((x) => !['page', 'pageLimit'].includes(x))
			.forEach((ele) => {
				if (filters[ele]) {
					item += 1;
				}
			});
		return item;
	};

	const OPTIONS = [
		{
			children: (
				<div className={styles.import_export}>
					<div className={styles.type_label}>DIRECT PAYMENT</div>
				</div>
			),
			key: 'PAYMENT',
		},
		{
			children: (
				<div className={styles.import_export}>
					<div className={styles.type_label}>QUOTA</div>
				</div>
			),
			key: 'QUOTA',
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>
					<div className={`${styles.title} ${styles.heading}`}>Apply Filters</div>
					{(filterLength > 0 || filters?.requestType) && (
						<div className={styles.sub_header}>{`Selected Filters (${calculateLength()})`}</div>
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
						<p>Clear Filters </p>
						<IcMCrossInCircle />
					</div>
				)}
			</div>
			<div className={styles.section2}>
				<div className={styles.section}>
					<CreatableSelect
						type="select"
						placeholder="Service Type"
						value={filters?.requestType}
						options={options || []}
						onChange={(e) => setFilters((prev) => ({
							...prev,
							requestType : e,
							page        : 1,
						}))}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>Status</div>
					<div className={styles.chips_container}>
						<Chips
							selectedItems={filters.paymentType}
							items={OPTIONS}
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
							<div className={styles.title}>Order Date Range From - To</div>
							<DateRangepicker
								pickerType="range"
								name="date"
								value={filters.date_range}
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
