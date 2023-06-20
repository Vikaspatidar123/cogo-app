import { cl, Tabs, TabPanel, Select, Button } from '@cogoport/components';
import { IcMListView, IcMMap } from '@cogoport/icons-react';
import { useState } from 'react';

import { TAB_MAPPING, DASHBOARD_VIEW_MAPPING } from '../../../constant/tabMapping';
import useGetListTracker from '../../../hooks/useGetListTracker';
import useRedirectFn from '../../../hooks/useRedirectFn';

import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

const selectOpt = [
	{ label: 'This Month', value: 'month' },
	{ label: 'This Week', value: 'week' },
	{ label: 'This Year', value: 'year' },
];

function MainContainer() {
	const [globalFilter, setGlobalFilter] = useState({
		page        : 1,
		selectValue : 'month',
		view        : 'list',
		activeTab   : 'ocean',
	});

	const { data, loading } = useGetListTracker();
	const { list = [], filter_data = {}, stats } = data || {};
	const { view, activeTab } = globalFilter;
	const { redirectToList } = useRedirectFn();

	return (
		<div className={styles.container}>

			<div className={cl`${styles.flex_box} ${styles.header}`}>
				<div className={styles.flex_box}>
					<div className={styles.title}>Overview</div>
					<div>
						<Tabs
							themeType="tertiary"
							activeTab={globalFilter.activeTab}
							onChange={(e) => setGlobalFilter((prev) => ({
								...prev,
								activeTab: e,
							}))}
						>
							{Object.keys(TAB_MAPPING).map((tab) => (
								<TabPanel key={tab} name={tab} title={TAB_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>
				</div>

				<div className={cl`${styles.flex_box} ${styles.filter_section}`}>
					<span />
					<div className={styles.view_tab}>
						<Tabs
							themeType="tertiary"
							activeTab={globalFilter.view}
							onChange={(e) => setGlobalFilter((prev) => ({
								...prev,
								view: e,
							}))}
						>
							{Object.keys(DASHBOARD_VIEW_MAPPING).map((tab) => (
								<TabPanel key={tab} name={tab} icon={DASHBOARD_VIEW_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>

					<Select
						size="sm"
						value={globalFilter.selectValue}
						onChange={(e) => setGlobalFilter((prev) => ({
							...prev,
							selectValue: e,
						}))}
						placeholder="Select Books"
						options={selectOpt}
						className={styles.select_field}
					/>

					<Button type="button" themeType="secondary" onClick={() => redirectToList({})}>
						View All Shipments
					</Button>
				</div>
			</div>

			<div className={styles.tracking_info}>
				<TrackingInfo stats={stats} view={view} activeTab={activeTab} />
			</div>
		</div>
	);
}

export default MainContainer;
