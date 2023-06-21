import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import earnedList from '../../../configutation/earned-list';
import useTableData from '../../../hooks/useTableData';

import List from './List';
import styles from './styles.module.css';

function PointsHistory() {
	const [activeTab, setActiveTab] = useState('All');
	const config = earnedList;
	const { loading, dataList, handlePageChange, setSortFilter, sortFilter } = useTableData(
		{
			activeTab,
		},
	);
	return (
		<div>
			<div className={styles.title_head}>Points History</div>
			<div className={styles.horizontal}>
				<hr className={styles.line} />
			</div>
			<div className={styles.container}>
				<div className={styles.segmented_style}>

					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel name="All" title="All" />
						<TabPanel name="Earned" title="Earned" />
						<TabPanel name="Redeemed" title="Redeemed" />
						<TabPanel name="Expired" title="Expired" />
					</Tabs>
				</div>
			</div>
			<div>
				<List
					dataList={dataList}
					config={config}
					handlePageChange={handlePageChange}
					setSortFilter={setSortFilter}
					sortFilter={sortFilter}
					loading={loading}
				/>

			</div>
		</div>
	);
}
export default PointsHistory;
