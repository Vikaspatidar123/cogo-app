import { Pagination } from '@cogoport/components';

import dashboardTableConfig from '../../../../configuration/dashboardTableConfig';
import useRedirectFn from '../../../../hooks/useRedirectFn';

import StatsContainer from './StatsContainer';
import styles from './styles.module.css';

import MapContainer from '@/ui/page-components/air-ocean-tracking/common/MapContainer';
import Table from '@/ui/page-components/air-ocean-tracking/common/Table';

function TrackingInfo({ summaryHook, view }) {
	const { data, loading, globalFilter, setGlobalFilter } = summaryHook;
	const { activeTab } = globalFilter;
	const {
		page_limit = 0, total_count = 0, on_track_shipments = 0,
		shipments_delayed = 0, attention_required = 0,
	} = data || {};
	const { redirectToTracker } = useRedirectFn();

	const itmFunction = {
		redirectToTracker,
		activeTab,
	};

	return (
		<div className={styles.container}>
			<StatsContainer
				stats={{ on_track_shipments, shipments_delayed, attention_required }}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
			/>

			{view === 'list'
				? (
					<Table
						configs={dashboardTableConfig({ type: activeTab })}
						data={data}
						loading={loading}
						isClickable={false}
						showPagination={false}
						showHover={false}
						itmFunction={itmFunction}
					/>
				)
				: (
					<MapContainer height="55vh" data={data} activeTab={activeTab} />
				)}
			<div className={styles.pagination_container}>
				<Pagination
					type="compact"
					currentPage={globalFilter.page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(e) => setGlobalFilter((prev) => ({ ...prev, page: e }))}
				/>
			</div>
		</div>
	);
}
export default TrackingInfo;
