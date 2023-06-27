import { cl, Popover, Button, Select, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import STATS_MAPPING from '../../../../constant/statsMapping';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function FilterSection({
	globalFilter, filter, setFilter, filterData = {}, setGlobalFilter, selectValueChangeHandler,
}) {
	const { activeTab = '' } = globalFilter;
	const { inputValue, selectValue } = filter;

	return (
		<div className={cl`${styles.flex_box} ${styles.filter_section}`}>
			<Input
				size="sm"
				className={styles.search_field}
				value={inputValue}
				onChange={(e) => setFilter((prev) => ({ ...prev, inputValue: e }))}
				placeholder="Search"
				suffix={<IcMSearchlight />}
			/>

			<Select
				size="sm"
				className={styles.select_field}
				placeholder="Select Status"
				options={STATS_MAPPING}
				value={selectValue}
				onChange={selectValueChangeHandler}
				isClearable
			/>

			<Popover
				caret={false}
				placement="bottom-end"
				content={(
					<FilterContent
						filterData={filterData}
						activeTab={activeTab}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>

				)}
			>
				<Button themeType="accent" type="button">
					Filters
				</Button>
			</Popover>
		</div>
	);
}

export default FilterSection;
