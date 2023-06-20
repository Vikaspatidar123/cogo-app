import { Pagination, Button, Popover } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow, IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Loading from '../../common/Loading';
import Map from '../../common/Map';
import useFetchScheduleDetails from '../../hooks/useFetchScheduleDetails';
import useGetHandel from '../../hooks/useGetHandel';
import NoSchedulesCard from '../NoSchedulesCard';

import ActiveScheduleCard from './ActiveScheduleCard';
import Filter from './Filter';
import Navigation from './Navigation';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ActiveSchedules() {
	const { query, push } = useRouter();

	const id = query?.id;
	const [currentPage, setCurrentPage] = useState(1);

	const {
		setFilters, scheduleDetails,
		setCarrierList, carrierList,
		filterFetchLoading,
	} = useFetchScheduleDetails({
		pageLimit: 6, id, currentPage,
	});
	const {
		handleCheckList, clearAllHandler,
		onChange, durationValue, setArrivalDate, arrivalDate,
		setDepartureDate,
		departureDate,
		setVisible,
		visible,
	} = useGetHandel({ setFilters, setCarrierList, setCurrentPage, carrierList });

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
					visible={visible}
					render={(
						<Filter
							carrierList={carrierList}
							setFilters={setFilters}
							scheduleDetails={scheduleDetails}
							durationValue={durationValue}
							onChange={onChange}
							clearAllHandler={clearAllHandler}
							handleCheckList={handleCheckList}
							setArrivalDate={setArrivalDate}
							setDepartureDate={setDepartureDate}
							departureDate={departureDate}
							arrivalDate={arrivalDate}
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

			<div className={styles.container_box}>
				<div className={styles.filter}>
					<Navigation
						departureDate={departureDate}
						setDepartureDate={setDepartureDate}
						arrivalDate={arrivalDate}
						setArrivalDate={setArrivalDate}
						carrierList={carrierList}
						handleCheckList={handleCheckList}
						durationValue={durationValue}
						onChange={onChange}
						setFilters={setFilters}
						clearAllHandler={clearAllHandler}
					/>
				</div>
				<div className={styles.active_schedules}>
					{filterFetchLoading && (
						<div className={styles.card}>
							<Loading />
						</div>
					)}
					{!filterFetchLoading && scheduleDetails?.schedules?.list.length > 0
						&& scheduleDetails?.schedules?.list.map((item) => (
							<ActiveScheduleCard
								schedule={item}
								scheduleDetails={scheduleDetails}
							/>
						))}
					{!filterFetchLoading && scheduleDetails?.schedules?.list.length === 0 && <NoSchedulesCard />}
				</div>
			</div>
			{scheduleDetails?.schedules?.list.length > 0 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={currentPage}
						totalItems={scheduleDetails?.schedules?.total_count}
						pageSize={6}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
}

export default ActiveSchedules;
