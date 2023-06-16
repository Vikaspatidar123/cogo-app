import { cl, Tabs, TabPanel, ButtonGroup, Select, Button } from '@cogoport/components';
import { IcMListView, IcMMap } from '@cogoport/icons-react';
import { useState } from 'react';

import { DASHBOARD_TAB_MAPPING } from '../../../constant/tabMapping';
import useRedirectFn from '../../../hooks/useRedirectFn';

import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

const getBtnGrpOpt = ({ setGlobalFilter }) => [
	{
		children : (<div><IcMListView width={20} height={20} /></div>),
		onClick  : () => setGlobalFilter((prev) => ({
			...prev,
			isList: true,
		})),
	},
	{
		children : (<div><IcMMap width={20} height={20} /></div>),
		onClick  : () => setGlobalFilter((prev) => ({
			...prev,
			isList: false,
		})),
	},
];

const selectOpt = [
	{ label: 'This Month', value: 'month' },
	{ label: 'This Week', value: 'week' },
	{ label: 'This Year', value: 'year' },
];

function MainContainer() {
	const [globalFilter, setGlobalFilter] = useState({
		page        : 1,
		selectValue : 'month',
		isList      : false,
		activeTab   : 'all',
	});

	const { redirectToList } = useRedirectFn();
	const btnGrpOpt = getBtnGrpOpt({ setGlobalFilter });

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
							{Object.keys(DASHBOARD_TAB_MAPPING).map((tab) => (
								<TabPanel name={tab} title={DASHBOARD_TAB_MAPPING?.[tab]} />
							))}
						</Tabs>
					</div>
				</div>
				<div className={cl`${styles.flex_box} ${styles.filter_section}`}>
					<ButtonGroup size="sm" options={btnGrpOpt} />
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
					<Button themeType="secondary" onClick={redirectToList}>
						View All Shipments
					</Button>
				</div>
			</div>

			<div className={styles.tracking_info}>
				<TrackingInfo />
			</div>
		</div>
	);
}

export default MainContainer;
