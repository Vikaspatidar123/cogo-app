import { Placeholder, Pagination, Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import CC from '../../constants/condition-constants';
import useGetShipmentList from '../../hooks/useGetShipmentList';

import EmptyState from './EmptyState';
import Header from './Header';
import Item from './Item';
import styles from './styles.module.css';

import useGetPermission from '@/packages/hooks/useGetPermission';

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
		refetchListShipment,
	} = useGetShipmentList(params);

	const { isConditionMatches } = useGetPermission();

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
		refetchListShipment();
	};

	const renderTabPanel = () => {
		if (loading) {
			return [...Array(3).keys()].map(() => (
				<Placeholder height="150px" width="100%" margin="30px 0px 20px 0px" className={styles.loading} />));
		}

		if (!loading && data.length === 0) {
			return <EmptyState viewAs={viewAs} />;
		}
		return (
			<div>
				{total > 10 ? (
					<div className={styles.page_container}>
						<Pagination
							type="number"
							totalItems={total}
							pageSize={10}
							currentPage={page}
							onPageChange={(val) => hookSetters.setFilters({
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

					{isConditionMatches(CC.SEE_SHIPPER_CONSIGNEE_TAB, 'or') && (
						<TabPanel name="shipper_consignee" title="SHIPPER/CONSIGNEE SHIPMENTS">
							{renderTabPanel()}
						</TabPanel>
					)}
				</Tabs>
			</div>
		</div>
	);
}

export default ShipmentList;
