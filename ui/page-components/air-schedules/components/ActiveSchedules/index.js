import { Pagination, Button, Popover } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow, IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Loading from '../../common/Loading';
import Map from '../../common/Map';
import useFetchScheduleDetails from '../../hooks/useFetchScheduleDetails';
import NoSchedulesCard from '../NoSchedulesCard';

import ActiveScheduleCard from './ActiveScheduleCard';
import Filter from './Filter';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ActiveSchedules() {
	const { query, push } = useRouter();
	const [visible, setVisible] = useState(false);

	const id = query?.id;
	const [currentPage, setCurrentPage] = useState(1);

	const {
		setFilters, scheduleDetails,
		setCarrierList, carrierList,
		loading, mapPoints,
	} = useFetchScheduleDetails({
		pageLimit: 6, id, currentPage,
	});

	const handleBack = () => {
		push('/saas/air-schedules');
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
					{scheduleDetails?.origin_airport?.name || 'Origin'}
				</div>
				<div className={styles.icon_container}>
					<IcMPortArrow fill="#88CAD1" width="1.5rem" height="1.5rem" />
				</div>
				<div className={styles.header_text}>
					{scheduleDetails?.destination_airport?.name || 'Destination'}
				</div>
			</div>
			<div className={styles.map_container}>
				<Map
					mapPoints={mapPoints}
					portDetails={scheduleDetails}
					transportMode="AIR"
					width="100%"
				/>
			</div>
			<div className={styles.middle_container}>
				<div className={styles.middle_text_container}>
					Active Schedules
				</div>

				<Popover
					placement="left"
					visible={visible}
					render={(
						<Filter
							carrierList={carrierList}
							setCarrierList={setCarrierList}
							setFilters={setFilters}
							scheduleDetails={scheduleDetails}
							setVisible={setVisible}
						/>
					)}
				>
					<div>
						<Button themeType="accent" className={styles.button} onClick={() => setVisible(!visible)}>
							Filter By
							<IcMFilter />
						</Button>
					</div>
				</Popover>

			</div>

			<div className={styles.active_schedules}>
				{loading && 		(
					<div className={styles.card}>
						<Loading />
					</div>
				)}
				{!loading && scheduleDetails?.schedules?.list.length > 0
					&& scheduleDetails?.schedules?.list.map((item) => (
						<ActiveScheduleCard
							schedule={item}
							scheduleDetails={scheduleDetails}
						/>
					))}
				{!loading && scheduleDetails?.schedules?.list.length === 0 && <NoSchedulesCard />}
			</div>
			<div className={styles.pagination_container}>
				{scheduleDetails?.schedules?.list.length > 0
				&& (
					<Pagination
						type="number"
						currentPage={currentPage}
						totalItems={scheduleDetails?.schedules?.total_count}
						pageSize={scheduleDetails?.schedules?.page_limit}
						onPageChange={setCurrentPage}
					/>
				)}
			</div>
		</div>
	);
}

export default ActiveSchedules;
