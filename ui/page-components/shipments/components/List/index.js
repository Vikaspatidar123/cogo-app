// import { Tabs, TabPanel } from '@cogoport/front/components';
// import { Pagination } from '@cogoport/front/components/admin';
// import React, { useState } from 'react';

// import useGetShipmentList from '../../../hooks/useGetShipmentList';
// import EmptyState from '../EmptyState';
// import Loader from '../ShipmentCard/Loader';

// import Header from './Header';
// import Item from './Item';
// import { Container, Main, PaginationContainer } from './styles';
import { Placeholder, Pagination, Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import useGetShipmentList from '../../hooks/useGetShipmentList';

import Header from './Header';
import Item from './Item';
import styles from './styles.module.css';

function ShipmentList() {
	const viewAs = 'importer_exporter';
	const [params, setParams] = useState(null);
	const {
		loading,
		page,
		filters,
		list: { data, total },
		hookSetters,
		setCurrentTab,
		currentTab,
		config,
	} = useGetShipmentList(viewAs, params);

	const handleTabChange = (val) => {
		if (currentTab !== val) {
			setCurrentTab(val);
			hookSetters.setFilters({ page: 1 });
			hookSetters.setList({
				data       : [],
				total      : 0,
				total_page : 0,
			});
		}
	};

	const renderTabPanel = () => {
		if (loading) {
			return <Placeholder />;
		}

		// if (!loading && data.length === 0) {
		// 	return <EmptyState viewAs={viewAs} />;
		// }

		return (
			<div>
				{total > 10 ? (
					<div className={styles.page_container}>
						<Pagination
							className="md"
							total={total}
							pagination={page}
							setPagination={(val) => hookSetters.setFilters({
								...filters,
								page: val,
							})}
						/>
					</div>
				) : null}

				{(data || []).map((item) => (
					<Item key={item.serial_id} data={item} viewAs={viewAs} />
				))}
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<Header
					filters={filters}
					hookSetters={hookSetters}
					config={config}
					setParams={setParams}
					viewAs={viewAs}
				/>

				<Tabs activeTab={currentTab} onChange={handleTabChange}>
					<TabPanel name="ongoing" title="ONGOING SHIPMENTS">
						{renderTabPanel()}
					</TabPanel>

					<TabPanel name="past" title="CLOSED SHIPMENTS">
						{renderTabPanel()}
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default ShipmentList;
