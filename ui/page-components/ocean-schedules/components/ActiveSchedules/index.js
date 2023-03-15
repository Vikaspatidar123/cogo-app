import { Pagination, Button, Popover } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow, IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Map from '../../common/Map';
import useFetchScheduleDetails from '../../hooks/useFetchScheduleDetails';
import LoadingPage from '../LoadingPage';
import NoSchedulesCard from '../NoSchedulesCard';

import ActiveScheduleCard from './ActiveScheduleCard';
import Filter from './Filter';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ActiveSchedules() {
	const { query, push } = useRouter();

	const id = query?.id;
	const [currentPage, setCurrentPage] = useState(1);

	const {
		setFilters, scheduleDetails, MAX_TIME, timeRemaining,
		setCarrierList, carrierList, filterFetchLoading,
		loadingForFirstVisit,
	} = useFetchScheduleDetails({
		pageLimit: 6, id, currentPage,
	});

	const handleBack = () => {
		push('/saas/ocean-schedules');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					fill="#000000"
					width="1.2rem"
					height="1.2rem"
					style={{ cursor: 'pointer' }}
					onClick={handleBack}
				/>
				<div className={styles.header_text}>
					{scheduleDetails?.origin_port?.name || 'Origin'}
				</div>
				<div className={styles.icon_container}>
					<IcMPortArrow fill="#88CAD1" width="1.5rem" height="1.5rem" />
				</div>
				<div className={styles.header_text}>
					{scheduleDetails?.destination_port?.name || 'Destination'}
				</div>
			</div>
			<div className={styles.map_container}>
				<Map
					portDetails={scheduleDetails}
					transportMode="OCEAN"
					width="100%"
				/>
			</div>
			<div className={styles.middle_container}>
				<div className={styles.middle_text_container}>
					Active Schedules
				</div>
				<Popover
					placement="left"
					render={(
						<Filter
							carrierList={carrierList}
							setCarrierList={setCarrierList}
							setFilters={setFilters}
							scheduleDetails={scheduleDetails}
						/>
					)}
				>
					<div>
						<Button themeType="accent" className={styles.button}>
							Filter By
							<IcMFilter />
						</Button>
					</div>
				</Popover>
			</div>
			<div className={styles.active_schedules}>
				{!loadingForFirstVisit && scheduleDetails?.schedules?.list.length > 0
					&& scheduleDetails?.schedules?.list.map((item) => (
						<ActiveScheduleCard
							schedule={item}
							scheduleDetails={scheduleDetails}
						/>
					))}
				{!loadingForFirstVisit && scheduleDetails?.schedules?.list.length === 0 && <NoSchedulesCard />}
				{filterFetchLoading && timeRemaining > 0
					&& <LoadingPage MAX_TIME={MAX_TIME} timeRemaining={timeRemaining} /> }
			</div>
			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					currentPage={currentPage}
					totalItems={scheduleDetails?.schedules?.total_count}
					pageSize={6}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}

export default ActiveSchedules;
