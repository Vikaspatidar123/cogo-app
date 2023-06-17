import {
	ButtonIcon, Tabs, TabPanel, cl, Select, Button, Input, Popover,
} from '@cogoport/components';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import STATS_MAPPING from '../../../constant/statsMapping';
import TAB_MAPPING from '../../../constant/tabMapping';
import useGetDsrList from '../../../hooks/useGetDsrList';
import useRedirectFn from '../../../hooks/useRedirectFn';

import DailyReport from './DailyReport';
import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Header({ globalFilter, filterChangeHandler, inputValue, setInputValue, filterData = {}, setGlobalFilter }) {
	const { query } = useRouter();
	const [showConfigure, setShowConfigure] = useState(false);
	const [viewTab, setViewTab] = useState('all');

	const { isArchived = false } = query || {};
	const { activeTab = '', selectValue = '' } = globalFilter;

	const { redirectArchivedList, redirectToDashboard } = useRedirectFn();

	const dsrListValue = useGetDsrList({ showConfigure });

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.first_row}`}>

				<div className={styles.flex_box}>
					<ButtonIcon size="lg" icon={<IcMArrowBack />} themeType="primary" onClick={redirectToDashboard} />
					<h2>{isArchived ? 'Archive List' : 'Shipment List'}</h2>
					<div>
						<Tabs
							themeType="tertiary"
							activeTab={activeTab}
							onChange={(e) => filterChangeHandler('activeTab', e)}
						>
							{Object.keys(TAB_MAPPING).map((tab) => (
								<TabPanel name={tab} title={TAB_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>
				</div>

				<div className={styles.flex_box}>
					{!isArchived && (
						<>
							<Button
								type="button"
								themeType="linkUi"
								onClick={() => redirectArchivedList(activeTab)}
							>
								Archived List
							</Button>
							{activeTab === 'ocean' && (
								<Popover
									caret={false}
									visible={showConfigure}
									content={(
										<DailyReport
											activeTab={activeTab}
											dsrListValue={dsrListValue}
											setShowConfigure={setShowConfigure}
										/>
									)}
									placement="bottom-end"
								>
									<Button
										themeType="secondary"
										type="button"
										onClick={() => setShowConfigure((prev) => !prev)}
									>
										Daily Status Report
									</Button>
								</Popover>
							)}
						</>
					)}
					<Button type="button">Export Data</Button>
				</div>

			</div>

			<div className={cl`${styles.flex_box} ${styles.second_row}
			${activeTab === 'ocean' ? styles.ocean_row : ''}`}
			>
				{activeTab === 'ocean'	&& (
					<div style={{ width: '42%' }}>
						<Tabs
							activeTab={viewTab}
							onChange={setViewTab}
							themeType="secondary"
							fullWidth
						>
							<TabPanel name="all" title="All" />
							<TabPanel name="blView" title="BL View" />
							<TabPanel name="containerView" title="Container View" />
						</Tabs>
					</div>
				)}
				<div className={cl`${styles.flex_box} ${styles.filter_section}`}>
					<Input
						size="sm"
						className={styles.search_field}
						value={inputValue}
						onChange={setInputValue}
						placeholder="Search"
						suffix={<IcMSearchlight />}
					/>
					<Select
						size="sm"
						className={styles.select_field}
						placeholder="Select Status"
						options={STATS_MAPPING}
						value={selectValue}
						onChange={(e) => filterChangeHandler('selectValue', e)}
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

			</div>
		</div>
	);
}

export default Header;
