import { Button, Popover, CreatableSelect, DateRangepicker, Chips } from '@cogoport/components';
import { IcMFilter, IcMCrossInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import { options, optionsType } from './filterOptions';
import styles from './styles.module.css';

function FilterContent({ filters, setFilters }) {
	const [dateRangePickerValue, setDateRangePickerValue] = useState({});

	return (
		<div className={styles.container}>
			<div className={styles.heading_div}>
				<div className={styles.title}>Apply Filters</div>
				{Object.keys(filters).length > 0 && (
					<div
						className={styles.clear_button}
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
					</div>
				)}
			</div>

			<div>
				<div className={styles.section}>
					<div className={styles.heading}>Status</div>
					<CreatableSelect
						placeholder="Enter Status"
						value={filters.status}
						options={options}
						onChange={(e) => setFilters((prev) => ({
							...prev,
							status: e,
						}))}
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.heading}>Type</div>
					<Chips
						selectedItems={filters.policyType}
						items={optionsType}
						onItemChange={(e) => setFilters((prev) => ({
							...prev,
							policyType: e,
						}))}
						size="lg"
					/>
				</div>
				<div className={styles.section}>
					<div className={styles.heading}>Date Ranging from</div>
					<DateRangepicker
						value={dateRangePickerValue}
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

function FilterSection({ isMobile, filters, setFilters, activeTab }) {
	const [showFilters, setshowFilters] = useState(false);
	return (
		<Popover
			maxWidth={450}
			theme="light"
			interactive={showFilters}
			visible={showFilters}
			onClickOutside={() => setshowFilters(false)}
			content={(
				<FilterContent
					filters={filters}
					setFilters={setFilters}
					isMobile={isMobile}
					activeTab={activeTab}
				/>
			)}
		>
			<Button onClick={() => setshowFilters(!showFilters)} themeType="accent">
				{!isMobile && (
					<>
						Filter By
						<IcMFilter />
					</>
				)}
				{isMobile && <IcMFilter height={25} width={25} />}
			</Button>
		</Popover>
	);
}

export default FilterSection;
