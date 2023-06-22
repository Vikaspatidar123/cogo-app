import { cl, Tabs, TabPanel, Select, Button } from '@cogoport/components';
import { useState } from 'react';

import { TAB_MAPPING, DASHBOARD_VIEW_MAPPING } from '../../../constant/tabMapping';
import useGetSummary from '../../../hooks/useGetSummary';
import useRedirectFn from '../../../hooks/useRedirectFn';

import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

const selectOpt = [
	{ label: 'Last 30 days', value: '30' },
	{ label: 'Last 100 days', value: '100' },
];

function MainContainer() {
	const [view, setView] = useState('list');
	const { redirectToList } = useRedirectFn();

	const summaryHook = useGetSummary();
	const { globalFilter, setGlobalFilter } = summaryHook;

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
							activeTab={view}
							onChange={setView}
						>
							{Object.keys(DASHBOARD_VIEW_MAPPING).map((tab) => (
								<TabPanel key={tab} name={tab} icon={DASHBOARD_VIEW_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>

					<Select
						size="sm"
						value={globalFilter?.period_in_days}
						onChange={(e) => setGlobalFilter((prev) => ({
							...prev,
							period_in_days: e,
						}))}
						placeholder="Select Period"
						options={selectOpt}
						className={styles.select_field}
						isClearable
					/>

					<Button type="button" onClick={() => redirectToList({})}>
						View All Shipments
					</Button>
				</div>
			</div>

			<div className={styles.tracking_info}>
				<TrackingInfo summaryHook={summaryHook} view={view} />
			</div>
		</div>
	);
}

export default MainContainer;
