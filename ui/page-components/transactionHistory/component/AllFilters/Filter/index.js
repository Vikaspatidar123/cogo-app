import { Pill, Button, Popover } from '@cogoport/components';
// import CreatableSelect from '@cogoport/front/components/admin/Select';
// import { DateRangePicker } from '@cogoport/front/components/DateTimePicker';
import { IcMFilter, IcMCrossInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import { billTypeOptions, paymentTypeOptions } from './filterOptions';
import styles from './styles.module.css';

function FilterContent({ filters, setFilters }) {
	const [dateRangePickerValue, setDateRangePickerValue] = useState({});
	const filtersKeyLength = Object.keys(filters).length;
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div className={styles.title}>Apply Filters</div>
				{filtersKeyLength > 0 && (
					<Button
						className="secondary md"
						role="presentation"
						onClick={() => {
							setFilters({
								page      : 1,
								pageLimit : 10,
							});
							setDateRangePickerValue({});
						}}
					>
						<p>Clear Filters </p>
						<IcMCrossInCircle />
					</Button>
				)}
			</div>

			<div className="section2">
				<div className={styles.section}>
					<div className={styles.title}>Bill type</div>
					{/* <CreatableSelect
						type="select"
						placeholder="Enter Bill Type"
						value={filters.bill_type}
						options={billTypeOptions}
						onChange={(e) => setFilters((prev) => ({
							...prev,
							bill_type: e,
						}))}
					/> */}
				</div>
				<div className={styles.section}>
					<div className={styles.title}>Status</div>
					<Pill
						value={filters.payment_status}
						options={paymentTypeOptions}
						onChange={(e) => setFilters((prev) => ({
							...prev,
							payment_status: e,
						}))}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.title}>Bill date ranging from</div>
					{/* <DateRangePicker
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
					/> */}
				</div>
			</div>
		</div>
	);
}

function FilterSection({ isMobile, filters, setFilters }) {
	const [showFilters, setshowFilters] = useState(false);
	return (
		<Popover
			maxWidth={450}
			theme="light"
			interactive={showFilters}
			visible={showFilters}
			onClickOutside={() => setshowFilters(false)}
			content={
				<FilterContent filters={filters} setFilters={setFilters} isMobile={isMobile} />
			}
		>
			<Button onClick={() => setshowFilters(!showFilters)}>
				{!isMobile && (
					<div>
						Filter By
						{' '}
						<IcMFilter />
					</div>
				)}
				{isMobile && <IcMFilter height={15} width={14} />}
			</Button>
		</Popover>
	);
}

export default FilterSection;
